import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import {
  Card,
  CircularProgress,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import { AuthContext } from "../../context/auth.context";
import SimpleModal from "../shared/SimpleModal";
import useStyles from "../../styles/book.styles";
import { useHttp } from "../../hooks/http.hook";
import validationSchema from "../../validators/genre.validator";
import CountryUpdate from "./CountryUpdate";

const Country = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [edit, showEdit] = useState(false);
  const [country, setCountry] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formikEdit = useFormik({
    initialValues: {
      name: country ? country.name : "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/countries/${location.pathname.substring(9)}`,
          "PUT",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        setSubmitting(false);
        showEdit(!edit);
      } catch (error) {}
    },
  });

  const loadCountry = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/countries`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999, aid: location.pathname.substring(9) }
      );
      setCountry(response.data.countries[0]);
    } catch (error) {}
  };

  const showEditForm = async () => {
    showEdit(!edit);
  };

  useEffect(() => {
    loadCountry();
  }, [formikEdit.isSubmitting]);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={clearError} />
      )}
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Card>
            {loading && (
              <Grid container spacing={2}>
                <CircularProgress
                  color="secondary"
                  style={{
                    width: "200%",
                    height: "200%",
                    margin: "auto",
                    marginTop: "3%",
                  }}
                />
              </Grid>
            )}
            {country && !loading && (
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Country details
                </Typography>
                <Typography variant="h3" className={classes.lines}>
                  {`${country.name}`}
                </Typography>
                {country && (
                  <CardActions>
                    {auth.admin && (
                      <Button size="small" onClick={showEditForm}>
                        Edit country data
                      </Button>
                    )}
                    <Button size="small" onClick={() => history.goBack()}>
                      Go back
                    </Button>
                  </CardActions>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
      {edit && country && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.form}>
              <CountryUpdate formik={formikEdit} />
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Country;
