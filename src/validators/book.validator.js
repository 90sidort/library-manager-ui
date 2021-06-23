import * as Yup from "yup";
import allowedLanguages from "../utils/languages";

const validationSchemaBookEdit = Yup.object({
  title: Yup.string()
    .required("Title required!")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(600, "Cannot be longer than 600 characters!"),
  language: Yup.string()
    .required("Language required")
    .oneOf(
      allowedLanguages,
      "Language has to be polish/ english/ french/ spanish or german."
    ),
  genre: Yup.array()
    .required("Genres required")
    .min(1, "Cannot have less than one genre!")
    .max(3, "Cannot have more than three genres!"),
  authors: Yup.array()
    .required("Authors required")
    .min(1, "Cannot have less than one author!")
    .max(3, "Cannot have more than three authors!"),
  pages: Yup.number()
    .required("Pages required")
    .min(1, "Cannot have less than 1 page!")
    .max(10000, "Cannot have more pages than 10000!"),
  published: Yup.number()
    .required("Published date required")
    .min(1900, "Cannot be published before 1900!")
    .max(3000, "Cannot be published after 3000!"),
  publisher: Yup.string()
    .required("Publisher required!")
    .min(2, "Cannot be shorter than 2 characters!")
    .max(800, "Cannot be longer than 800 characters!"),
  available: Yup.boolean()
  .required("Availability details are required"),
  description: Yup.string()
    .required("Description required!")
    .max(1500, "Cannot be longer than 1500 characters!"),
});

export default validationSchemaBookEdit;
