import * as Yup from "yup";

const validationSchemaSignIn = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email required!")
    .min(1, "Cannot be shorter than 1 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Cannot be shorter than 6 characters!")
    .max(16, "Cannot be longer than 16 characters!"),
});

export default validationSchemaSignIn;
