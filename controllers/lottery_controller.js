import { PdfReader } from 'pdfreader';
import LotteryResult from '../classes/lottery_result';

const parsePdf = function (resolve, reject) {
    let data = '';
    let lotteryResult = new LotteryResult();
    const is4Lettered = true;

    return (error, item) => {
        if (error) {
            console.error("error at pdf parsing:", error);
            reject(error);
        }
        else if (!item) {
            /** End of buffer */
            resolve({ ...lotteryResult.get() });
        }
        else if (item.text) {
            data += item.text;
            lotteryResult
                .parseDate(item.text)
                .parseLotteryNo(item.text)
                .identifyPrize('1st Prize Rs', 'prize1', item.text)
                .identifyPrize('Cons Prize-Rs', 'prizeCons', item.text)
                .identifyPrize('2nd Prize Rs', 'prize2', item.text)
                .identifyPrize('3rd Prize Rs', 'prize3', item.text)
                .identifyPrize('4th Prize-Rs', 'prize4', item.text, is4Lettered)
                .identifyPrize('5th Prize-Rs', 'prize5', item.text, is4Lettered)
                .identifyPrize('6th Prize-Rs', 'prize6', item.text, is4Lettered)
                .identifyPrize('7th Prize-Rs', 'prize7', item.text, is4Lettered)
                .identifyPrize('8th Prize-Rs', 'prize8', item.text, is4Lettered)
                .append(item.text);
        }
    };
};

/** @param {String} filename with path ex: 'test/sample.pdf' */
const parseLotteryFile = file => {
    const promise = new Promise((resolve, reject) => {
        new PdfReader().parseFileItems(file, parsePdf(resolve, reject));
    });
    return promise;
};

const parseLotteryBuffer = buffer => {
    const promise = new Promise((resolve, reject) => {
        new PdfReader().parseBuffer(buffer, parsePdf(resolve, reject));
    });
    return promise;
};

const saveLotteryResultToDB = async (result, db) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const response = await db.collection('results').replaceOne({ date: result.date }, result, { upsert: true });
            console.log('pdf upload success:...', response);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};

const searchForPrize = async (ticketNo, date, db) => {
    //-----------------------------------
    /**@todo: handle empty db response */

    let value;
    const promise = new Promise((resolve, reject) => {
        try {
            db.collection('results')
                .aggregate([
                    { '$unwind': '$entries' },
                    { '$match': { 'entries.ticketNo': ticketNo, date: date } },
                    {
                        '$project': {
                            'ticketNo': '$entries.ticketNo',
                            'prize': '$entries.prize',
                            'prizes': '$prizes'
                        }
                    }
                ])
                .forEach(doc => value = doc)
                .then(() => {
                    console.log('value...', value);
                    resolve(value || null);
                });
        }
        catch (error) {
            reject(error);
        }
    });

    return promise;
};

const loadLotteryResults = async (limit = 10, sort = 'date', order = 'desc', db) => {
    const promise = new Promise(async (resolve, reject) => {
        let result = [];
        db.collection('results')
            .aggregate(
                [
                    {
                        '$addFields': {
                            'prizeAmount': '$prizes.prize1',
                            'winnerNo': { '$first': '$entries.ticketNo' }
                        },
                    },
                    {
                        '$project': {
                            'entries': 0,
                            'prizes': 0,
                        }
                    }
                ]
            )
            .sort({ date: -1 })
            .limit(parseInt(limit, 10))
            .forEach(doc => result.push(doc))
            .then(() => resolve(result))
            .catch(error => reject(error));
    });
    return promise;
};

const loadLotteryResultByKey = async (key, value, db) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            let filter = {};
            filter[key] = value;
            const response = await db.collection('results').findOne(filter);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};

export { parseLotteryFile, parseLotteryBuffer, saveLotteryResultToDB, searchForPrize, loadLotteryResults, loadLotteryResultByKey };