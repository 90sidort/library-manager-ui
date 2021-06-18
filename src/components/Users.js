import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  List,
  makeStyles,
  Typography,
  TablePagination,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import SingleListItemUser from "./shared/SingleListItemUser";
import SimpleModal from "./shared/SimpleModal";

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
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  fields: {
    margin: "auto",
    width: "50%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Users = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const readSearch = () => {
    const stateData = {
      name: "",
      surname: "",
      email: "",
    };
    if (location.search) {
      const searchQuery = location.search.substring(1);
      const queries = searchQuery.split("&");
      queries.forEach((query) => {
        const variables = query.split("=");
        stateData[variables[0]] = variables[1];
      });
    }
    return stateData;
  };
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState(readSearch());
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePage = (e, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  const cancelError = () => setErrorMessage("");
  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    setPage(1);
    const newSearch = { ...search, [id]: value };
    setSearch(newSearch);
    history.push({
      pathname: "/users",
      search: `name=${newSearch.name}&surname=${newSearch.surname}&email=${newSearch.email}`,
    });
  };

  const handleUserDelete = async (id) => {
    setLoading(true);
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`,
        headers: { authorization: `Bearer ${auth.token}` },
      });
      await getUsers();
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  const getUsers = async () => {
    try {
      const parameters = readSearch(location);
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page, limit, ...parameters },
      });
      setUsers(data.users);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getUsers();
    }, 1000);
    return () => clearTimeout(timer);
  }, [auth.token, limit, page, search]);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
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
              className={classes.fields}
            />
            <TextField
              id="surname"
              label="Surname"
              variant="outlined"
              onChange={handleSearchChange}
              value={search.surname}
              className={classes.fields}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleSearchChange}
              value={search.email}
              className={classes.fields}
            />
          </form>
          <TablePagination
            component="div"
            page={page - 1}
            rowsPerPage={limit}
            count={count}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <div className={classes.demo}>
            {loading && (
              <Grid container spacing={2}>
                <CircularProgress
                  color="secondary"
                  style={{
                    width: "20%",
                    height: "20%",
                    margin: "auto",
                    marginTop: "3%",
                  }}
                />
              </Grid>
            )}
            {users && !loading && (
              <List>
                {users.length > 0 ? (
                  users.map((user) => (
                    <SingleListItemUser
                      key={user._id}
                      id={user._id}
                      name={user.name}
                      surname={user.surname}
                      link={`users/${user._id}`}
                      deleteUser={handleUserDelete}
                    />
                  ))
                ) : (
                  <p>No users match search criteria</p>
                )}
              </List>
            )}
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Users;
