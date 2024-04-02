import multer from "multer";
import { createRouter } from "next-connect";
import clientPromise from "../../../classes/db";
import {
    loadLotteryResults,
    parseLotteryBuffer,
    saveLotteryResultToDB,
} from "../../../controllers/lottery_controller";
import {
    ERR_INVALID_INPUT,
    ERR_SERVER_GENERIC,
    STATUS_SUCCESS,
} from "../../../utils/constants";

const upload = multer({
    storage: multer.memoryStorage(),
});

const apiRoute = createRouter();

apiRoute.use(upload.array("lotteryResult"));

apiRoute.post(async (req, res) => {
    /** Handle pdf post from admin - parse & save to db **/
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const result = await parseLotteryBuffer(req.files[0].buffer);
        if (!result.entries.length)
            res.status(ERR_INVALID_INPUT).json({ error: "invalid file" });
        await saveLotteryResultToDB(result, db);
        res.status(STATUS_SUCCESS).json({ data: "success" });
    } catch (error) {
        console.log(error);
        res
            .status(ERR_SERVER_GENERIC)
            .json({ error: error | "error while reading/saving lottery result" });
    }
});

apiRoute.get(async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { limit, _sort, _order } = req.query;
        const result = await loadLotteryResults(limit, _sort, _order, db);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error while reading lottery results" });
    }
});

export default apiRoute.handler({
    onError: (error, req, res) => {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNonMatch: (req, res) => {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
