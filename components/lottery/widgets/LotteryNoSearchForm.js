import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const LotteryNoSearchForm = (props) => {
    const [lotteryNo, setLotteryNo] = useState(props.lotteryNo || '');
    const onInputChange = event => {
        event.preventDefault();
        setLotteryNo(event.target.value.trim().toUpperCase());
    };

    const onSubmit = event => {
        event.preventDefault();
        props.onSubmit(lotteryNo);
    };

    return (
        <Box className='lotteryno-search-form' sx={{ pt: 3 }} component='form' onSubmit={onSubmit}>
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