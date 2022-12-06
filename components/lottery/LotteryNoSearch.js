import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import LotteryNoSearchForm from './widgets/LotteryNoSearchForm';
import LotteryResultGroup from './widgets/LotteryResultGroup';

const LotteryNoSearch = () => {
    const [lotteryResults, setLotteryResults] = useState();

    return (
        <Card>
            <LotteryNoSearchForm onSubmit={setLotteryResults} />
            {/* <CardHeader title='Lottery Results' subheader='KR-765' /> */}
            <CardContent>
                {
                    lotteryResults === null && <Card>Lottery Number not found!!</Card>
                }
                {
                    (lotteryResults !== null && lotteryResults instanceof Object) && <>
                        {
                            lotteryResults.prizeGroups.map(result => <LotteryResultGroup key={Math.random()} result={result} />)
                        }
                    </>
                }
            </CardContent>
        </Card>
    );
};

export default LotteryNoSearch;