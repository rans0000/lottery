import DeleteIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import React from 'react';

const LotteryResultList = ({ results }) => {
    return (
        <Card>
            <TableContainer>
                <Table aria-label='recent lottery results'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align='right'>Lottery</TableCell>
                            <TableCell align='right'>Prize</TableCell>
                            <TableCell align='right'>Winner</TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            results.map(result => (
                                <TableRow
                                    key={result._id}
                                    hover
                                >
                                    <TableCell component='th' scope='row'>{`${dayjs(result.date).format('DD MMM')}`.toUpperCase()}</TableCell>
                                    <TableCell align='right'>{result.lotteryNo}</TableCell>
                                    <TableCell align='right'>{result.prizeAmount}</TableCell>
                                    <TableCell align='right'>{result.winnerNo}</TableCell>
                                    <TableCell align='right'><DeleteIcon sx={{ fontSize: 16 }} /></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default LotteryResultList;