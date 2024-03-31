import dayjs from "dayjs";
import * as yup from "yup";
import { DRAW_REGEX } from "../utils/constants";

yup.addMethod(yup.MixedSchema, "dateOrDrawSchema", function (schemas) {
    return this.test(
        "one-of-date-or-draw",
        "Please enter a draw number or date",
        (item) => {
            return schemas.some((schema) =>
                schema.isValidSync(item, { strict: true })
            );
        }
    );
});

export const combinedSearchSchema = yup.object({
    dateOrDraw: yup.mixed().dateOrDrawSchema([
        yup.string().matches(DRAW_REGEX, {
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
