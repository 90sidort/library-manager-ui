import React from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

import useStyles from "../../styles/signup.styles";

const BookBorrow = (props) => {
  const { formik } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Borrow book
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>
          <Button
            disabled={
              JSON.stringify(formik.errors) !== "{}" || !formik.touched.email
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Borrow
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default BookBorrow;
