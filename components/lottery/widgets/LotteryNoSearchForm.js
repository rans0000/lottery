import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DateOrDrawInput from "./DateOrDrawInput";
import { combinedSearchSchema } from "../../../schema/combined_search_schema";

const LotteryNoSearchForm = (props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({
        mode: "onChange",
        defaultValues: { dateOrDraw: props.defaultValue },
        resolver: yupResolver(combinedSearchSchema),
    });

    const onSubmit = (formData) => {
        props.onSubmit(formData.dateOrDraw);
    };

    return (
        <Box
            className="lotteryno-search-form"
            sx={{ pt: 3 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <DateOrDrawInput
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                />
                <Button type="submit" variant="contained">
                    Search
                </Button>
            </Stack>
        </Box>
    );
};

export default LotteryNoSearchForm;
