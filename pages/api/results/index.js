import { createRouter, expressWrapper } from 'next-connect';
import multer from 'multer';
import clientPromise from '../../../classes/db';
import { parseLotteryBuffer, saveLotteryResultToDB, loadLotteryResults } from '../../../controllers/lottery_controller';

const upload = multer({
    storage: multer.memoryStorage(),
});

const apiRoute = createRouter();

apiRoute.use(upload.array('lotteryResult'));

apiRoute.post(async (req, res) => {
    /** Handle pdf post from admin - parse & save to db **/
    console.log('in post handler');
    try {
        const client = await clientPromise;
        const db = client.db('test');
        const result = await parseLotteryBuffer(req.files[0].buffer);
        await saveLotteryResultToDB(result, db);
        res.status(200).json({ data: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error while reading/saving lottery result' });
    }

});

apiRoute.get(async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db('test');
        const { limit, _sort, _order } = req.query;
        const result = await loadLotteryResults(limit, _sort, _order, db);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error while reading lottery results' });
    }
});

export default apiRoute.handler({
    onError: (error, req, res) => {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNonMatch: (req, res) => {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
});

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};