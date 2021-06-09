import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  List,
  makeStyles,
  Typography,
  TablePagination,
  TextField,
} from "@material-ui/core";

import { AuthContext } from "../context/auth.context";
import SingleListItem from "./shared/SingleListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
  },
  form: {
    margin: theme.spacing(1),
    width: "100%",
    marginLeft: 10,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Users = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const searchInitial = {
    name: "",
    surname: "",
    email: "",
  };
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState(searchInitial);

  const handleChangePage = (e, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    setPage(1);
    setSearch({ ...search, [id]: value });
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page, limit, ...search },
      });
      setUsers(response.data.users);
      setCount(response.data.count);
    };
    getUsers();
  }, [auth.token, limit, page, search]);

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" className={classes.title}>
          Users
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleSearchChange}
            value={search.name}
          />
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            onChange={handleSearchChange}
            value={search.surname}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleSearchChange}
            value={search.email}
          />
        </form>
        <div className={classes.demo}>
          {users && (
            <List>
              {users.length > 0 ? (
                users.map((user) => (
                  <SingleListItem
                    key={user._id}
                    name={user.name}
                    surname={user.surname}
                    link={`users/${user._id}`}
                  />
                ))
              ) : (
                <p>No users match search criteria</p>
              )}
            </List>
          )}
        </div>
      </Grid>
      <TablePagination
        component="div"
        page={page - 1}
        rowsPerPage={limit}
        count={count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
