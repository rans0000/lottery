import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import LotteryNoSearchForm from "../../components/lottery/widgets/LotteryNoSearchForm";
import LotteryResultGroup from "../../components/lottery/widgets/LotteryResultGroup";
import buildApiURL from "../../utils/apiUrlConstants";

const LotteryResultDetailsPage = ({ results }) => {
    const router = useRouter();
    const [lotteryNo, setLotteryNo] = useState(router.query.lotteryNo || "");

    useEffect(() => {
        if (!lotteryNo || lotteryNo === router.query.lotteryNo) return;
        router.push(`/result/${lotteryNo}`);
    }, [lotteryNo, router]);

    return (
        <Container maxWidth="lg" className="lotter-result-page">
            <Head>
                <title>{`Lottery Website | ${router.query.lotteryNo}`}</title>
            </Head>
            <LotteryNoSearchForm onSubmit={setLotteryNo} />
            {results === null && (
                <Card sx={cardStyle}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{ height: "100%" }}
                    >
                        Lottery Number not found!!
                    </Stack>
                </Card>
            )}
            {results !== null && results instanceof Object && (
                <>
                    <Typography variant="h4" align="center" mt={2}>
                        {router.query.lotteryNo}
                    </Typography>
                    {results.prizeGroups.map((result) => (
                        <LotteryResultGroup
                            key={Math.random()}
                            result={result}
                            prizes={results.prizes}
                        />
                    ))}
                </>
            )}
        </Container>
    );
};

export default LotteryResultDetailsPage;

export const getServerSideProps = async ({ params }) => {
    const results = await loadLotteryResult(params.lotteryNo);
    return { props: { results: results.payload, key: params.lotteryNo } };
};

const loadLotteryResult = async (lotteryNo) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const url = buildApiURL("lottery.getLotteryResult", [lotteryNo], true);
            const response = await fetch(url);
            const result = await response.json();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};

const cardStyle = {
    px: 4,
    py: 2,
    flexGrow: 1,
    width: "fit-content",
    height: 160,
    mx: "auto",
    my: 2,
};
