import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const LotteryNumberSearchForm = props => {

    const [lotteryNumber, setLotteryNumber] = useState('');
    const [date, setDate] = useState(dayjs());

    const onInputChange = event => {
        const value = event.target.value;
        setLotteryNumber(value.substring(0, 9).toUpperCase());
    };

    const onDateChange = newDate => {
        setDate(newDate);
    };

    const onSubmit = event => {
        event.preventDefault();
        console.log({ lotteryNumber, date });
    };

    return (
        <Card >
            <Box component='form' style={{ padding: 20 }} onSubmit={onSubmit}>
                <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                >
                    <TextField
                        id='lotteryNumber'
                        label='Lottery Number'
                        variant='outlined'
                        placeholder='ex: WT 529148 or 9148'
                        value={lotteryNumber}
                        onChange={onInputChange}
                    />
                    <DatePicker
                        disableFuture
                        label='Basic example'
                        value={date}
                        onChange={onDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button type='submit' variant='contained'>Contained</Button>
                </Stack>
            </Box>

        </Card>
    );
};

export default LotteryNumberSearchForm;