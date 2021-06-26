import React from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

import useStyles from "../../styles/signup.styles";
import allowedLanguages from "../../utils/languages";

const BookUpdate = (props) => {
  const { formik, genres, authors } = props;
  const classes = useStyles();
  const optionsLanguages = allowedLanguages.map((language, i) => (
    <MenuItem key={i} value={language}>
      {language}
    </MenuItem>
  ));
  const optionsGenres = genres.map((genre, i) => (
    <MenuItem key={i} value={genre._id}>
      {genre.name}
    </MenuItem>
  ));
  const optionsAuthors = authors.map((author, i) => (
    <MenuItem key={i} value={author._id}>
      {`${author.surname}, ${author.name}`}
    </MenuItem>
  ));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update book
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
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
                select
                id="genre"
                name="genre"
                label="Genre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.genre && formik.errors.genre}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                SelectProps={{
                  multiple: true,
                  value: formik.values.genre,
                }}
              >
                {optionsGenres}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="authors"
                name="authors"
                label="Authors"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.authors && formik.errors.authors}
                error={formik.touched.authors && Boolean(formik.errors.authors)}
                SelectProps={{
                  multiple: true,
                  value: formik.values.authors,
                }}
              >
                {optionsAuthors}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="language"
                name="language"
                label="Language"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.language && formik.errors.language}
                error={
                  formik.touched.language && Boolean(formik.errors.language)
                }
                SelectProps={{
                  value: formik.values.language,
                }}
              >
                {optionsLanguages}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="pages"
                name="pages"
                label="Pages"
                value={formik.values.pages}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pages && Boolean(formik.errors.pages)}
                helperText={formik.touched.pages && formik.errors.pages}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="published"
                name="published"
                label="Published"
                value={formik.values.published}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.published && Boolean(formik.errors.published)
                }
                helperText={formik.touched.published && formik.errors.published}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="publisher"
                name="publisher"
                label="Publisher"
                value={formik.values.publisher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.publisher && Boolean(formik.errors.publisher)
                }
                helperText={formik.touched.publisher && formik.errors.publisher}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="available"
                name="available"
                label="Available"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.available && formik.errors.available}
                error={
                  formik.touched.available && Boolean(formik.errors.available)
                }
                SelectProps={{
                  value: formik.values.available,
                }}
              >
                <MenuItem key="available" value={true}>
                  Available
                </MenuItem>
                <MenuItem key="nonavailable" value={false}>
                  Not available
                </MenuItem>
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
            disabled={JSON.stringify(formik.errors) !== "{}"}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save changes
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

export default BookUpdate;
