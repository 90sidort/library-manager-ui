import React, { useState } from "react";
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
  const entryFormState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    about: "",
  };
  const classes = useStyles();
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
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (sign) {
        const response = await axios.post(
          `http://localhost:3000/api/users/login`,
          { email: signForm.email, password: signForm.password }
        );
      }
      if (!sign) {
        const response = await axios.post(`http://localhost:3000/api/users`, {
          ...signForm,
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  let form;
  if (!sign)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {sign ? "Sign in" : "Sign up"}
        </Typography>
        <form className={classes.form} autoComplete="off" onSubmit={formSubmit}>
          {form}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={formSubmit}
          >
            {sign ? "Sign in" : "Sign up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={onSignChange}>
                {sign
                  ? "Do not have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Sign;
