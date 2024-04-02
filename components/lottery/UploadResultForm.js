import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadResultSchema } from "../../schema/lottery_schema";
import buildApiURL from "../../utils/apiUrlConstants";
import {
    ERR_INVALID_INPUT,
    UI_STATE_ERROR,
    UI_STATE_LOADING,
    UI_STATE_OK,
} from "../../utils/constants";

const UploadResultForm = () => {
    const [uiState, setUIState] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(uploadResultSchema),
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("lotteryResult", data.file[0]);
        formData.append("filename", data.file[0].name);

        try {
            setUIState(UI_STATE_LOADING);
            const res = await fetch(buildApiURL("lottery.uploadLotteryResult"), {
                headers: {
                    "content-type": "multipart/form-data",
                },
                method: "post",
                body: formData,
            });
            if (!res.ok) throw res;
            const result = await res.json();
            console.log(result);
            setUIState(UI_STATE_OK);
        } catch (err) {
            setUIState(UI_STATE_ERROR);
            console.log(err);
            if (err?.status === ERR_INVALID_INPUT) {
                console.log("invalid file....");
            }
        }
    };

    return (
        <Box mt={3} className="upload-wrapper">
            <Card>
                <CardContent>
                    <Stack
                        component="form"
                        encType="multipart/form-data"
                        direction="row"
                        spacing={2}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Button
                            variant="outlined"
                            component="label"
                            disabled={uiState === UI_STATE_LOADING}
                        >
                            <AddIcon />
                            Add File
                            <input type="file" accept=".pdf" {...register("file")} hidden />
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={uiState === UI_STATE_LOADING}
                        >
                            Upload
                        </Button>
                    </Stack>
                    <Box mt={2}>
                        {
                            <Typography variant="body2">
                                {watch("file") && watch("file")[0] && watch("file")[0].name}
                            </Typography>
                        }
                        {errors.file && (
                            <Typography variant="body2" sx={{ color: "error.light" }}>
                                {errors.file.message}
                            </Typography>
                        )}
                    </Box>
                    <Stack>{uiState === UI_STATE_LOADING && <CircularProgress />}</Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UploadResultForm;
