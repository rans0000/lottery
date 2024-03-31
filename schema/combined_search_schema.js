import * as yup from "yup";
import dayjs from "dayjs";

yup.addMethod(yup.MixedSchema, "dateOrDrawSchema", function (schemas) {
    return this.test(
        "one-of-dateordraw",
        "schemas are wrong at ${path}",
        (item) => {
            return schemas.some((schema) =>
                schema.isValidSync(item, { strict: false })
            );
        }
    );
});

export const combinedSearchSchema = yup.object({
    dateOrDraw: yup
        .mixed()
        .dateOrDrawSchema([
            yup
                .string()
                .matches(/^[a-z]{2}(\/|-|\s){0,1}[0-9]{3}$/i, {
                    message: "Draw format should be like (WL-123)",
                    excludeEmptyString: true,
                }),
            yup
                .string()
                .test(
                    "is-a-date",
                    "Date format should be Year/month/date (2023-02-23)",
                    (value) => dayjs(value, ["YYYY-MM-DD", "YYYY/MM/DD"], true).isValid()
                ),
        ]),
});
