import clientPromise from '../../../../classes/db';
import { searchForPrize } from '../../../../controllers/lottery_controller'

const handler = async (req, res) => {
    /**@params {string} ticketNo */
    /**@params {string} date */

    const client = await clientPromise;
    const db = client.db('test');
    const { ticketNo, date } = req.query;
    /**@todo : validate user data */
    try {
        console.log('xxxx', decodeURIComponent(ticketNo), decodeURIComponent(date));
        const result = await searchForPrize(decodeURIComponent(ticketNo), decodeURIComponent(date), db);
        res.status(200).json({ payload: result });
    } catch (error) {
        res.status(500).json({ payload: 'error while searching for prize!!' });
    }

};

export default handler;