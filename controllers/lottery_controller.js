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
                .dateParser(item.text)
                .identifier('1st Prize Rs', 'prize1', item.text)
                .identifier('Cons Prize-Rs', 'prizeCons', item.text)
                .identifier('2nd Prize Rs', 'prize2', item.text)
                .identifier('3rd Prize Rs', 'prize3', item.text)
                .identifier('4th Prize-Rs', 'prize4', item.text, is4Lettered)
                .identifier('5th Prize-Rs', 'prize5', item.text, is4Lettered)
                .identifier('6th Prize-Rs', 'prize6', item.text, is4Lettered)
                .identifier('7th Prize-Rs', 'prize7', item.text, is4Lettered)
                .identifier('8th Prize-Rs', 'prize8', item.text, is4Lettered)
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
        let response;
        try {
            response = await db.collection('results').replaceOne({ date: result.date }, result, { upsert: true });
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
            console.log(error);
            reject(error);
        }
    });

    return promise;
};

export { parseLotteryFile, parseLotteryBuffer, saveLotteryResultToDB, searchForPrize };