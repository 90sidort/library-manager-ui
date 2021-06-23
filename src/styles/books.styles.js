import { makeStyles } from "@material-ui/core";

const useStylesBooks = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },
  form: {
    width: "90%",
    marginTop: "1%",
    margin: "auto !important",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formGrid: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

export default useStylesBooks;
