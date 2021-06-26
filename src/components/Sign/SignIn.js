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
import validationSchema from "../../validators/signin.validator";

const SignIn = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };
  const cancelError = () => setErrorMessage("");
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          { email: values.email, password: values.password }
        );
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
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
            </Grid>
            <Button
              disabled={JSON.stringify(formik.errors) !== "{}"}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signup" style={{ textDecoration: "none" }}>
                  <Link variant="body2">Don't have an account? Sign up</Link>
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignIn;
