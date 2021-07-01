import { makeStyles } from "@material-ui/core";

const useStylesReviews = makeStyles((theme) => ({
  root: {
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1%",
  },
  item: {
    marginBottom: "2%",
  },
  inline: {
    display: "inline",
  },
}));

export default useStylesReviews;
