import React from 'react';
import Box from '@mui/material/Box';

import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const AppLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Box component='main'>
                {children}
            </Box>
            <AppFooter />
        </>
    );
};

export default AppLayout;