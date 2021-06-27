import * as Yup from "yup";

const validationSchemaAuthor = Yup.object({
  name: Yup.string()
    .required("Name required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  surname: Yup.string()
    .required("Surname required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(100, "Cannot be longer than 100 characters!"),
  description: Yup.string().max(1000, "Cannot be longer than 1000 characters!"),
  country: Yup.string()
    .required("Country required")
    .matches("^[0-9a-fA-F]{24}$", { message: "Must be valid country" }),
});

export default validationSchemaAuthor;
