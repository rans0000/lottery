import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import buildApiURL from '../../../utils/apiUrlConstants';

const LotteryNoSearchForm = props => {
    const [lotteryNo, setLotteryNo] = useState('');
    const onInputChange = event => {
        event.preventDefault();
        setLotteryNo(event.target.value.trim().toUpperCase());
    };
    const onSubmit = async event => {
        event.preventDefault();
        const response = await fetch(buildApiURL('lottery.getLotteryResult', [lotteryNo]));
        const result = await response.json();
        if (!result.payload) {
            props.onSubmit(null);
            return;
        };
        let keys = [];
        let temp;
        let prizeGroups = [];
        result.payload.entries.forEach(item => {
            if (!keys.includes(item.prize)) {
                keys.push(item.prize);
                prizeGroups.push({ title: item.prize, ticketNo: [] });
                temp = prizeGroups[prizeGroups.length - 1].ticketNo;
            }
            temp.push(item.ticketNo);
        });
        console.log(prizeGroups);
        props.onSubmit({
            prizeGroups,
            prizes: result.payload.prizes,
            date: result.payload.date,
            lotteryNo: result.payload.lotteryNo
        });
    };

    return (
        <Box sx={{ pt: 3 }} component='form' onSubmit={onSubmit}>
            <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={2}
            >
                <TextField
                    id='lotteryNo'
                    label='Lottery Number'
                    variant='outlined'
                    placeholder='ex: W-691'
                    value={lotteryNo}
                    onChange={onInputChange}
                />
                <Button type='submit' variant='contained'>Search</Button>
            </Stack>
        </Box>
    );
};

export default LotteryNoSearchForm;