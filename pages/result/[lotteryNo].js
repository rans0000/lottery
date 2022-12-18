import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LotteryNoSearchForm from '../../components/lottery/widgets/LotteryNoSearchForm';
import LotteryResultGroup from '../../components/lottery/widgets/LotteryResultGroup';
import buildApiURL from '../../utils/apiUrlConstants';

const LotteryResultDetailsPage = ({ results }) => {
    const router = useRouter();
    const [lotteryNo, setLotteryNo] = useState(router.query.lotteryNo || '');

    useEffect(() => {
        if (!lotteryNo || lotteryNo === router.query.lotteryNo) return;
        router.push(`/result/${lotteryNo}`);
    }, [lotteryNo]);

    return <Container maxWidth='lg' className='lotter-result-page'>
        <Head>
            <title>Lottery Website | {router.query.lotteryNo}</title>
        </Head>
        <LotteryNoSearchForm onSubmit={setLotteryNo} />
        {
            results === null && <Card>Lottery Number not found!!</Card>
        }
        {
            (results !== null && results instanceof Object) && <>
                {
                    results.prizeGroups.map(result => <LotteryResultGroup
                        key={Math.random()}
                        result={result}
                        prizes={results.prizes}
                    />)
                }
            </>
        }
    </Container>
};

export default LotteryResultDetailsPage;

export const getServerSideProps = async ({ params }) => {
    const results = await loadLotteryResult(params.lotteryNo);
    return { props: { results, key: params.lotteryNo } };
};

const loadLotteryResult = async lotteryNo => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(buildApiURL('lottery.getLotteryResult', [lotteryNo], true));
            const result = await response.json();
            resolve(transformResult(result));
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};

const transformResult = result => {
    if (!result.payload) return null;
    let keys = [];
    let temp;
    let prizeGroups = [];
    result.payload.entries.forEach(item => {
        if (!keys.includes(item.prize)) {
            keys.push(item.prize);
            prizeGroups.push({ title: item.prize, ticketNo: [] });
            temp = prizeGroups[prizeGroups.length - 1].ticketNo;
        }
        temp.push(item.ticketNo);
    });
    return {
        prizeGroups,
        prizes: result.payload.prizes,
        date: result.payload.date,
        lotteryNo: result.payload.lotteryNo
    };
};