import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const UploadResultForm = () => {
    const [file, setFile] = useState();

    const onSelectFile = event => {
        setFile(event.target.files[0]);
    };

    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('lotteryResult', file);
        formData.append('filename', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        try {
            const response = await fetch('/api/lottery/result', {
                method: 'post',
                body: formData,
            });
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box style={{ paddingTop: 30 }}>
            <Stack
                method="post"
                component='form'
                encType="multipart/form-data"
                direction='row'
                spacing={2}
                onSubmit={onSubmit}
            >
                <Button variant='outlined' component='label'>
                    <AddIcon />Add File
                    <input type="file" name="lotteryResult" onChange={onSelectFile} hidden />
                </Button>
                <Button type='submit' variant='contained'>Upload</Button>
            </Stack>
        </Box>
    );
};

export default UploadResultForm;