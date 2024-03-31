import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import DateOrDrawInput from "../../components/lottery/widgets/DateOrDrawInput";
import { combinedSearchSchema } from "../../schema/combined_search_schema";

const TestPage = () => {
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
                <DateOrDrawInput register={register} errors={errors} setValue={setValue} />
                <Button type="submit" variant="contained">
                    Search
                </Button>
            </Stack>
        </Box>
    );
};

export default TestPage;
