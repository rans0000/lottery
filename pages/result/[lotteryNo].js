import Container from '@mui/material/Container';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

const LotteryResultDetails = () => {
    const router = useRouter();

    return <Container maxWidth='lg' className='lotter-result-page'>
        <Head>
            <title>Lottery Website | {router.query.lotteryNo}</title>
        </Head>
        Lottery page {router.query.lotteryNo}
    </Container>
};

export default LotteryResultDetails;