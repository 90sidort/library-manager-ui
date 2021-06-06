import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  List,
  makeStyles,
  Typography,
  TablePagination,
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
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const handleChangePage = (e, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page, limit },
      });
      setUsers(response.data.users);
      setCount(response.data.count);
    };
    getUsers();
  }, [auth.token, limit, page]);
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" className={classes.title}>
          Users
        </Typography>
        <div className={classes.demo}>
          <List>
            {users &&
              users.map((user) => (
                <SingleListItem
                  key={user._id}
                  name={user.name}
                  surname={user.surname}
                  link={`users/${user._id}`}
                />
              ))}
          </List>
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
