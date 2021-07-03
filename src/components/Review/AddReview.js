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

const AddReview = (props) => {
  const classes = useStyles();
  const { formik, cancelButton } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {cancelButton ? "Update review" : "Add review"}
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="rating"
                name="rating"
                label="Rating (1-6)"
                type="number"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rating && Boolean(formik.errors.rating)}
                helperText={formik.touched.rating && formik.errors.rating}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="review"
                name="review"
                label="Review"
                multiline
                rows={4}
                value={formik.values.review}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.review && Boolean(formik.errors.review)}
                helperText={formik.touched.review && formik.errors.review}
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
            {cancelButton ? "Update review" : "Add review"}
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
          {cancelButton && (
            <Button
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={() => cancelButton()}
            >
              Cancel
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};

export default AddReview;
