import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { combinedSearchSchema } from "../../../schema/combined_search_schema";

const DateOrDrawInput = () => {
    const [date, setDate] = useState("");
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(combinedSearchSchema),
    });

    const onDateChange = (newDate) => {
        setDate(newDate);
        let formatter = new Intl.DateTimeFormat("en");
        let example = formatter.formatToParts();
        setValue("dateOrDraw", newDate.toISOString().split("T")[0]);
    };

    const onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <Box
            className="input-dateordraw"
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
                <TextField
                    name="dateOrDraw"
                    label="Date/Draw number"
                    variant="standard"
                    placeholder="ex: W-691"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                    {...register("dateOrDraw")}
                    error={errors.dateOrDraw ? true : false}
                    helperText={errors?.dateOrDraw?.message}
                />
                <StaticDatePicker
                    disableFuture
                    label="Basic example"
                    value={date}
                    inputFormat="YYYY/MM/DD"
                    displayStaticWrapperAs="desktop"
                    onChange={onDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button type="submit" variant="contained">
                    Search
                </Button>
            </Stack>
        </Box>
    );
};

export default DateOrDrawInput;
