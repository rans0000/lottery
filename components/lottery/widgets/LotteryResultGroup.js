import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LotteryResultGroup = ({ result }) => {
    return (
        <Box style={{ padding: 10 }}>
            <Typography variant='h6'>{result.title}</Typography>
            <Typography variant='subtitle1' component='span'>(5000)</Typography>
            <Grid container spacing={2}>
                {
                    result.ticketNo.map(item => (
                        <Grid item key={item} md={3} sm={4}><Typography variant='body2'>{item}</Typography></Grid>
                    ))
                }

            </Grid>
            <Divider />
        </Box>
    );
};

export default LotteryResultGroup;