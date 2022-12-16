import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Head from 'next/head';
import React from 'react';

import LotteryNoSearch from '../components/lottery/LotteryNoSearch';
import LotteryResultList from '../components/lottery/LotteryResultList';
import TicketNoSearchForm from '../components/lottery/TicketNoSearchForm';
import buildApiURL from '../utils/apiUrlConstants';

export default function Home({ lotteryResults }) {
  const [currentTab, setCurrentTab] = React.useState(0);

  const onTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Lottery Website | Home</title>
      </Head>
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label='Result Search' />
        <Tab label='Prize Search' />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <LotteryNoSearch />
        <Box sx={{ height: 24 }}> </Box>
        <LotteryResultList results={lotteryResults} />
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
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Box>) : null;
}

export const getStaticProps = async () => {
  const result = await fetch(buildApiURL('lottery.getLotteryResultList', [4, 'date', 'desc'], true));
  const lotteryResults = await result.json();
  return {
    props: { lotteryResults }
  };
};

