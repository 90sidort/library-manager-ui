import * as Yup from "yup";

const validationSchemaSignUp = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email required!")
    .min(1, "Cannot be shorter than 1 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Cannot be shorter than 6 characters!")
    .max(16, "Cannot be longer than 16 characters!"),
  name: Yup.string()
    .required("Name required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  surname: Yup.string()
    .required("Surname required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  about: Yup.string().max(1000, "Cannot be longer than 1000 characters!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match!"
  ),
});

export default validationSchemaSignUp;
