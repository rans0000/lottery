export default function handler(req, res) {
    console.log('req method: ', req.method);
    switch (req.method.toLowerCase()) {
        case 'post':
            res.status(200).json({ status: 'success', payload: { id: 'tempId' } });
            console.log('POOOOOOOOOOSTED...');
            console.log(req.body);
            break;
        default:
            console.log('NOO...');
            res.status(500).json({ status: 'error', payload: { message: 'Something went wrong!!' } });
            break;
    }
}