import * as Yup from "yup";

const validationSchemaGenre = Yup.object({
  name: Yup.string()
    .required("Name required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(150, "Cannot be longer than 100 characters!"),
});

export default validationSchemaGenre;
