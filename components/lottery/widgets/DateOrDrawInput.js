import { yupResolver } from "@hookform/resolvers/yup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { combinedSearchSchema } from "../../../schema/combined_search_schema";

const DateOrDrawInput = () => {
    const [date, setDate] = useState("");
    const [open, setOpen] = React.useState(false);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const onDateChange = (newDate) => {
        setDate(newDate);
        setValue("dateOrDraw", newDate.toISOString().split("T")[0]);
        handleClose();
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
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    name="dateOrDraw"
                    label="Date/Draw number"
                    variant="standard"
                    placeholder="ex: W-691 or 2023/09/12"
                    InputLabelProps={{ shrink: true }}
                    {...register("dateOrDraw")}
                    error={errors.dateOrDraw ? true : false}
                    helperText={errors?.dateOrDraw?.message}
                />
                <IconButton onClick={handleClickOpen}>
                    <CalendarMonthIcon />
                </IconButton>
            </Stack>
            <Button type="submit" variant="contained">
                Search
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set backup account</DialogTitle>
                <StaticDatePicker
                    disableFuture
                    label="Basic example"
                    value={date}
                    inputFormat="YYYY/MM/DD"
                    displayStaticWrapperAs="desktop"
                    onChange={onDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Dialog>
        </Box>
    );
};

export default DateOrDrawInput;
