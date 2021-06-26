import { makeStyles } from "@material-ui/core";

const useStylesUsers = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
  },
  form: {
    margin: theme.spacing(1),
    width: "100%",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  fields: {
    margin: "auto",
    width: "50%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default useStylesUsers;
