import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';

const AppHeader = () => {
    return (
        <AppBar className='appbar' position='fixed'>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Lottery Website</Typography>
                <Link href='/' style={{ textDecoration: 'none' }}><Button color='secondary'>Home</Button></Link>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;