import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import buildApiURL from '../../utils/apiUrlConstants';

const TicketNoSearchForm = props => {

    const [ticketNo, setTicketNo] = useState('');
    const [date, setDate] = useState(dayjs());
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [lotteryResult, setLotteryResult] = useState();

    const onInputChange = event => {
        const value = event.target.value;
        setTicketNo(value.substring(0, 9).toUpperCase());
    };

    const onDateChange = newDate => {
        setDate(newDate);
    };

    const onAlertClose = () => {
        setAlertOpen(false);
    };

    const isFormValid = request => {
        return request.ticketNo.length > 0;
    };

    const onSubmit = async event => {
        event.preventDefault();
        /**@todo: form validation */
        const request = {
            ticketNo: ticketNo.trim(),
            date: dayjs(date).format('YYYY-MM-DD')
        };
        if (!isFormValid(request)) {
            setAlertOpen(true);
            return;
        }
        try {
            const response = await fetch(buildApiURL('lottery.getPrize', [request.ticketNo, request.date]));
            const result = await response.json();
            setLotteryResult(result?.payload);

        } catch (error) {
            console.log(error);
            console.log('Error while loading ticket result');
        }
    };

    return (
        <>
            <Card className='prize-search-form'>
                <Box component='form' style={{ padding: 20 }} onSubmit={onSubmit}>
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <TextField
                            id='ticketNo'
                            label='Lottery Number'
                            variant='outlined'
                            placeholder='ex: WT 529148 or 9148'
                            value={ticketNo}
                            onChange={onInputChange}
                        />
                        <DatePicker
                            disableFuture
                            label='Basic example'
                            value={date}
                            onChange={onDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button type='submit' variant='contained'>Search</Button>
                    </Stack>
                </Box>
            </Card>
            {
                (lotteryResult instanceof Array && lotteryResult.length > 0) && <>
                    {
                        lotteryResult.map((result, index) => <>
                            <Card style={{ padding: 20, marginTop: 16 }}>
                                <Typography variant='body2' gutterBottom>
                                    {result.prize}
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    {result.ticketNo}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Rs. {result.prizes[result.prize]}/-
                                </Typography>
                            </Card>
                        </>)
                    }
                </>
            }
            {
                (lotteryResult === null || (lotteryResult instanceof Array && lotteryResult.length === 0)) && <>
                    <Card style={{ padding: 20, marginTop: 16 }}>
                        <Stack style={{ height: 50 }} justifyContent="center" alignItems="center">
                            <Typography variant='body2'>No prize!! unfortunately</Typography>
                        </Stack>
                    </Card>
                </>
            }
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

export default TicketNoSearchForm;