import * as Yup from "yup";

const validationSchemaBookBorrow = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email required!")
    .min(1, "Cannot be shorter than 1 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
});

export default validationSchemaBookBorrow;
