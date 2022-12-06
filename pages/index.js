import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Head from 'next/head';

import LotteryNoSearch from '../components/lottery/LotteryNoSearch';
import TicketNoSearchForm from '../components/lottery/TicketNoSearchForm';

export default function Home() {
  const [currentTab, setCurrentTab] = React.useState(1);

  const onTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Lottery Website | Home</title>
      </Head>
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label='Prize Search' />
        <Tab label='Result Search' />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <TicketNoSearchForm />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <LotteryNoSearch />
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

