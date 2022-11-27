import Head from 'next/head';

import styles from '../styles/Home.module.css';
import LotteryNumberSearchForm from '../components/LotteryNumberSearchForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lottery Website | Home</title>
      </Head>

      <div>
        <br />
        <LotteryNumberSearchForm />
      </div>
    </div>
  );
}