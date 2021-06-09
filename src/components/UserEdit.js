import React from "react";
import { Typography, TextField, Grid } from "@material-ui/core";

const UserEdit = (props) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Change user data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            value={props.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="surname"
            name="surname"
            label="Surname"
            value={props.surname}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={props.email}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserEdit;
