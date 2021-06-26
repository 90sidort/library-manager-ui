import * as Yup from "yup";

const validationSchemaEditUser = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email required!")
    .min(1, "Cannot be shorter than 1 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  name: Yup.string()
    .required("Name required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  surname: Yup.string()
    .required("Surname required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  about: Yup.string().max(1000, "Cannot be longer than 1000 characters!"),
});

export default validationSchemaEditUser;
