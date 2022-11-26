import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lottery Website | Home</title>
      </Head>

      <div className={styles.main}>
        home page
      </div>
    </div>
  );
}