import * as Yup from "yup";

const validationSchemaReview = Yup.object({
  title: Yup.string()
    .required("Title required")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(700, "Cannot be longer than 700 characters!"),
  review: Yup.string()
    .min(2, "Cannot be shorter than 2 characters!")
    .max(2000, "Cannot be longer than 100 characters!"),
  rating: Yup.number()
    .required("Rating required")
    .min(1, "Cannot rate less than 1!")
    .max(6, "Cannot rate more than 6 !"),
  user: Yup.string()
    .required("User required")
    .matches("^[0-9a-fA-F]{24}$", { message: "Must be valid user id" }),
  book: Yup.string()
    .required("Book required")
    .matches("^[0-9a-fA-F]{24}$", { message: "Must be valid book id" }),
});

export default validationSchemaReview;
