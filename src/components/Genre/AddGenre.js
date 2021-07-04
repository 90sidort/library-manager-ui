import React from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Container,
  CssBaseline,
} from "@material-ui/core";

import useStyles from "../../styles/addbook.styles";

const AddGenre = (props) => {
  const classes = useStyles();
  const { formik } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new genre
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
          </Grid>
          <Button
            disabled={
              JSON.stringify(formik.errors) !== "{}" ||
              formik.values.name === ""
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add new genre
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={formik.handleReset}
          >
            Reset form
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddGenre;
