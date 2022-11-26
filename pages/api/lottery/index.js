import { PdfReader } from 'pdfreader';
import { createRouter, expressWrapper } from 'next-connect';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
});

const apiRoute = createRouter();

apiRoute.use(upload.array('lotteryResult'));

apiRoute.post((req, res) => {
    console.log('soll');
    console.log(req);
    //--------
    new PdfReader().parseBuffer(req.files[0].buffer, (err, item) => {
        if (err) console.error("error:", err);
        else if (!item) {
            console.warn("end of buffer");
            res.status(200).json({ data: 'success' });
        }
        else if (item.text) console.log(item.text);
    });
    //--------
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

// export default function handler(req, res) {
//     console.log('req method: ', req.method);
//     switch (req.method.toLowerCase()) {
//         case 'post':
//             res.status(200).json({ status: 'success', payload: { id: 'tempId' } });
//             console.log('POOOOOOOOOOSTED...');
//             // console.log(req.body);
//             //-------------
//             // new PdfReader().parseBuffer(req.body, (err, item) => {
//             //     if (err) console.error("error:", err);
//             //     else if (!item) console.warn("end of buffer");
//             //     else if (item.text) console.log(item.text);
//             // });
//             //-------------
//             break;
//         default:
//             console.log('NOO...');
//             res.status(500).json({ status: 'error', payload: { message: 'Something went wrong!!' } });
//             break;
//     }
// }