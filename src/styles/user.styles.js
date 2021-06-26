import { makeStyles } from "@material-ui/core";

const useStylesUser = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "3%",
  },
  borrowings: {
    width: "100%",
    marginTop: "1%",
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: "100%",
    marginTop: "1%",
    marginLeft: "1%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  lines: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default useStylesUser;
