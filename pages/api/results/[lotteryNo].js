import clientPromise from "../../../classes/db";
import { loadLotteryResultByKey } from "../../../controllers/lottery_controller";

const handler = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { lotteryNo } = req.query;
        const result = await loadLotteryResultByKey(lotteryNo, db);
        res.status(200).json({ payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error while reading lottery result" });
    }
};

export default handler;
