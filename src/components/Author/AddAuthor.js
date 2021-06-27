import React from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Container,
  CssBaseline,
  MenuItem,
} from "@material-ui/core";

import useStyles from "../../styles/addbook.styles";

const AddAuthor = (props) => {
  const classes = useStyles();
  const { countries, formik } = props;
  const defaultOption = (
    <option value="select" disabled>{`Select country`}</option>
  );
  const optionsCountries = countries.map((country, i) => (
    <MenuItem key={i} value={country._id}>
      {country.name}
    </MenuItem>
  ));
  optionsCountries.unshift(defaultOption);

  console.log(formik);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new author
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
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="country"
                name="country"
                label="Country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.country && formik.errors.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                SelectProps={{
                  value: formik.values.country,
                }}
              >
                {optionsCountries}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
          <Button
            disabled={
              JSON.stringify(formik.errors) !== "{}" ||
              JSON.stringify(formik.touched) === "{}"
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add new author
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

export default AddAuthor;
