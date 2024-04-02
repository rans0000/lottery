import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Head from "next/head";
import PropTypes from "prop-types";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from "../components/layout/AppLayout";
import "../styles/globals.css";
import createEmotionCache from "../utils/createEmotionCache";
import theme from "../utils/theme";

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppLayout>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Component {...pageProps} />
                    </LocalizationProvider>
                </AppLayout>
                <ToastContainer
                    hideProgressBar
                    position="bottom-right"
                    theme="light"
                />
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
