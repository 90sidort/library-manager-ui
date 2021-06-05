import React, { useContext, useState } from "react";
import {
  Typography,
  Link,
  Button,
  Container,
  Grid,
  TextField,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import SimpleModal from "./shared/SimpleModal";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Sign = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const entryFormState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    about: "",
  };
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [sign, setSignPage] = useState(false);
  const [signForm, setSignForm] = useState(entryFormState);

  const onSignChange = () => {
    setSignForm(entryFormState);
    setSignPage(!sign);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSignForm({ ...signForm, [id]: value });
  };

  const cancelError = () => setErrorMessage("");

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!sign) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          { email: signForm.email, password: signForm.password }
        );
        console.log(response);
        auth.login(
          response.data.userId,
          response.data.token,
          response.data.userName,
          response.data.admin
        );
        history.push("/");
      } else {
        const response = await axios.post(`http://localhost:5000/api/users`, {
          ...signForm,
        });
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "Server error");
    }
  };
  let form;
  if (sign)
    form = (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={signForm.name}
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={signForm.surname}
            variant="outlined"
            required
            fullWidth
            id="surname"
            label="Last Name"
            name="surname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={signForm.email}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={signForm.password}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={signForm.about}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="about"
            label="About"
            id="about"
          />
        </Grid>
      </Grid>
    );
  else
    form = (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={signForm.email}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={signForm.password}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
        </Grid>
      </Grid>
    );
  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {!sign ? "Sign in" : "Sign up"}
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={formSubmit}
          >
            {form}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onSubmit={formSubmit}
            >
              {!sign ? "Sign in" : "Sign up"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={onSignChange}>
                  {!sign
                    ? "Do not have an account? Sign up"
                    : "Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Sign;
