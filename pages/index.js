import React from 'react';
import Head from 'next/head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LotteryNumberSearchForm from '../components/LotteryNumberSearchForm';

export default function Home() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const onTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <div>
      <Head>
        <title>Lottery Website | Home</title>
      </Head>
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label='Prize Search' />
        <Tab label='Result Search' />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <LotteryNumberSearchForm />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        results page...
      </TabPanel>
      <div>
        <br />
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return value === index ? (
    <Box
      sx={{ p: 3 }}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Box>) : null;
}

