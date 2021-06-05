import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

const Users = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
      });
      setUsers(response.data.users);
    };
    getUsers();
  }, [users, auth]);
  return (
    <div>
      <p>Users</p>
      {users && users.map((user) => <p>{user.name}</p>)}
    </div>
  );
};

export default Users;
