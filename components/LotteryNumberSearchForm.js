import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const LotteryNumberSearchForm = props => {

    const [lotteryNumber, setLotteryNumber] = useState('');
    const [date, setDate] = useState(dayjs());
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [lotteryResult, setLotteryResult] = useState(null);

    const onInputChange = event => {
        const value = event.target.value;
        setLotteryNumber(value.substring(0, 9).toUpperCase());
    };

    const onDateChange = newDate => {
        setDate(newDate);
    };

    const onAlertClose = () => {
        setAlertOpen(false);
    };

    const isFormValid = request => {
        return request.lotteryNumber.length > 0;
    };

    const onSubmit = async event => {
        event.preventDefault();
        /**@todo: form validation */
        const request = {
            lotteryNumber: encodeURIComponent(lotteryNumber.trim()),
            date: encodeURIComponent(dayjs(date).format('YYYY-MM-DD'))
        };
        if (!isFormValid(request)) {
            setAlertOpen(true);
            return;
        }
        try {
            const response = await fetch(`/api/lottery/prize?ticketNo=${request.lotteryNumber}&date=${request.date}`);
            const result = await response.json();
            setLotteryResult(result?.payload);

        } catch (error) {
            console.log(error);
            console.log('Error while loading ticket result');
        }
    };

    return (
        <>
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
                        {
                            lotteryResult !== null && (
                                <Card style={{ padding: 20 }}>
                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                        {lotteryResult.prize}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {lotteryResult.ticketNo}
                                    </Typography>
                                </Card>
                            )}
                    </Stack>
                </Box>
            </Card>
            <Dialog
                open={isAlertOpen}
                onClose={onAlertClose}
            >
                <DialogTitle>Invalid ticket number</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        The ticket number you entered was invalid.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant='contained' onClick={onAlertClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LotteryNumberSearchForm;