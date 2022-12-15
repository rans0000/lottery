const API_URL = {
    lottery: {
        getPrize: '/prize?ticketNo=:ticketNo&date=:date',
        getLotteryResultList: '/result?limit=:limit&_sort=:sort&_order=:order',
        getLotteryResult: '/result/:lotteryNo',
        uploadLotteryResult: '/result'
    },
};

const buildApiURL = (key, params = [], isFullPath = false) => {
    const [apiModule, apiKey] = key.split('.');
    const url = API_URL[apiModule][apiKey];
    const temp = replaceParams(url, params);
    const baseURL = isFullPath ? process.env.NEXT_PUBLIC_BASE_URL : '';
    let path = baseURL + process.env.NEXT_PUBLIC_API_VERSION + '/api' + temp;
    return path;
};

function replaceParams(url, params) {
    const regex = /:[A-Za-z0-9\-]+/g;
    let index = 0;
    const path = url.replace(regex, (match, offset) => params[index++]);
    return path;
}

export default buildApiURL;