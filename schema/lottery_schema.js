import * as yup from "yup";

export const uploadResultSchema = yup.object().shape({
    file: yup.mixed()
        .test("required", "Please select a file", (file) => {
            if (file && file.length) return true;
            return false;
        })
});