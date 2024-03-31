import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";

const DateOrDrawInput = ({ register, setValue, errors, trigger }) => {
    const [date, setDate] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const onDateChange = (newDate) => {
        setDate(newDate);
        setValue("dateOrDraw", dayjs(newDate).format("YYYY-MM-DD"));
        trigger("dateOrDraw");
        handleClose();
    };

    return (
        <Box className="input-dateordraw" sx={{ pt: 3 }}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    name="dateOrDraw"
                    label="Date / Draw number"
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
