import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import LotteryResultList from "../components/lottery/LotteryResultList";
import TicketNoSearchForm from "../components/lottery/TicketNoSearchForm";
import LotteryNoSearchForm from "../components/lottery/widgets/LotteryNoSearchForm";
import buildApiURL from "../utils/apiUrlConstants";

export default function Home({ lotteryResults }) {
    const router = useRouter();
    const [currentTab, setCurrentTab] = React.useState(0);

    const onTabChange = (event, value) => {
        setCurrentTab(value);
    };

    const onLotteryNoSelect = (lotteryNo) => {
        if (!lotteryNo) return;
        router.push(`/results/${lotteryNo}`);
    };

    return (
        <Container maxWidth="lg" className="home-page">
            <Head>
                <title>Lottery Website | Home</title>
            </Head>
            <Tabs value={currentTab} onChange={onTabChange}>
                <Tab label="Result Search" />
                <Tab label="Prize Search" />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
                <Card sx={{ p: 2, pb: 3 }}>
                    <LotteryNoSearchForm onSubmit={onLotteryNoSelect} />
                </Card>
                <Box sx={{ height: 24 }}> </Box>
                <LotteryResultList
                    results={lotteryResults}
                    onSelect={onLotteryNoSelect}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <TicketNoSearchForm />
            </TabPanel>
            <div>
                <br />
            </div>
        </Container>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return value === index ? (
        <Box
            sx={{ py: 3 }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Box>
    ) : null;
}

export const getServerSideProps = async ({ req, res }) => {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );
    let lotteryResults;
    try {
        const result = await fetch(
            buildApiURL("lottery.getLotteryResultList", [4, "date", "desc"], true)
        );
        lotteryResults = await result.json();
    } catch (error) {
        lotteryResults = [];
    }
    return {
        props: { lotteryResults },
    };
};
