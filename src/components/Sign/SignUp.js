import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import SimpleModal from "../shared/SimpleModal";
import { AuthContext } from "../../context/auth.context";
import useStyles from "../../styles/signup.styles";
import validationSchema from "../../validators/signup.validator";

const SignUp = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  };
  const cancelError = () => setErrorMessage("");
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await axios.post(`http://localhost:5000/api/users`, {
          ...values,
        });
        auth.login(
          response.data.userId,
          response.data.token,
          response.data.userName,
          response.data.admin
        );
        setSubmitting(false);
        history.push("/");
      } catch (error) {
        setErrorMessage(
          error.response ? error.response.data.message : "Server error"
        );
      }
    },
  });
  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="surname"
                  name="surname"
                  label="Surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Repeat password"
                  type="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="about"
                  name="about"
                  label="About"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about}
                />
              </Grid>
            </Grid>
            <Button
              disabled={JSON.stringify(formik.errors) !== "{}"}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signin">
                  <Link variant="body2">Already have an account? Sign in</Link>
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
