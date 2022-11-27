import React from 'react';
import Box from '@mui/material/Box';

import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const AppLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Box component='main' style={{ flexGrow: 1, overflowY: 'auto' }}>
                {children}
            </Box>
            <AppFooter />
        </>
    );
};

export default AppLayout;