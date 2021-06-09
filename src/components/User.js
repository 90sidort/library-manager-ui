import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import { useLocation } from "react-router";
import { AuthContext } from "../context/auth.context";

import UserEdit from "./UserEdit";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  borrowings: {
    width: "100%",
    maxWidth: 360,
    marginTop: "1%",
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: "100%",
    marginTop: "1%",
    marginLeft: "1%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const User = () => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const uid = location.pathname.substring(7);
  const [user, setUser] = useState(null);
  const [borrows, showBorrows] = useState(false);
  const [edit, showEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  const showList = () => {
    showEdit(false);
    showBorrows(!borrows);
  };
  const showForm = () => {
    showBorrows(false);
    showEdit(!edit);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page: 1, limit: 1, uid },
      });
      const userData = response.data.users[0];
      setUser(userData);
      setFormData({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
      });
    };
    getUser();
  }, [auth.token, uid]);
  return (
    <React.Fragment>
      <Card className={classes.root}>
        {user && (
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              User details
            </Typography>
            <Typography variant="h5" component="h2">
              {`${user.surname}, ${user.name}`}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.archived ? "archived" : "active"}
            </Typography>
            <Typography variant="body2" component="p">
              {`email: ${user.email}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`joined: ${user.createdAt.split("T")[0]}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`about: ${user.about}`}
            </Typography>
          </CardContent>
        )}
        {user && (
          <CardActions>
            {auth.admin && (
              <Button size="small" onClick={showList}>
                Borrowed books
              </Button>
            )}
            {auth.admin | (auth.userId === user._id) && (
              <Button size="small" onClick={showForm}>
                Edit user data
              </Button>
            )}
          </CardActions>
        )}
      </Card>
      {user && auth.admin && borrows && (
        <div className={classes.borrowings}>
          <List component="nav">
            {user.borrowed.length ? (
              user.borrowed.map((book) => (
                <ListItem button key={book.book._id}>
                  <ListItemText primary={book.book.title} />
                </ListItem>
              ))
            ) : (
              <ListItem button>
                <ListItemText primary="No books" />
              </ListItem>
            )}
          </List>
        </div>
      )}
      {user && auth.admin && edit && (
        <div className={classes.form}>
          <UserEdit
            name={formData.name}
            surname={formData.surname}
            email={formData.email}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default User;

// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// export default function AddressForm() {
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Shipping address
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="firstName"
//             name="firstName"
//             label="First name"
//             fullWidth
//             autoComplete="given-name"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="lastName"
//             name="lastName"
//             label="Last name"
//             fullWidth
//             autoComplete="family-name"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="address1"
//             name="address1"
//             label="Address line 1"
//             fullWidth
//             autoComplete="shipping address-line1"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="address2"
//             name="address2"
//             label="Address line 2"
//             fullWidth
//             autoComplete="shipping address-line2"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="city"
//             name="city"
//             label="City"
//             fullWidth
//             autoComplete="shipping address-level2"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField id="state" name="state" label="State/Province/Region" fullWidth />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="zip"
//             name="zip"
//             label="Zip / Postal code"
//             fullWidth
//             autoComplete="shipping postal-code"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="country"
//             name="country"
//             label="Country"
//             fullWidth
//             autoComplete="shipping country"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
//             label="Use this address for payment details"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }
