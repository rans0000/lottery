import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const LotteryResultGroup = ({ result, prizes }) => {
    return (
        <Card className='lottery-result-item' sx={{ p: 4, my: 2 }}>
            <Typography variant='h6'>{result.title}</Typography>
            <Typography variant='subtitle1' component='span'>( Rs. {prizes[result.title]}/-)</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                {
                    result.ticketNo.map(item => (
                        <Grid item key={item} md={3} sm={4}><Typography variant='body2'>{item}</Typography></Grid>
                    ))
                }

            </Grid>
        </Card>
    );
};

export default LotteryResultGroup;