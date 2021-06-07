import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "./context/auth.context";
import { useAuth } from "./hooks/auth.hook";
import Sign from "./components/Sign";
import Books from "./components/Books";
import Users from "./components/Users";
import ButtonAppBar from "./components/shared/Navigation";
import User from "./components/User";

function App() {
  const { token, login, logout, userId, admin, userName } = useAuth();
  console.log(token);
  let appRoutes;

  if (token)
    appRoutes = (
      <Switch>
        <Route path="/" exact={true}>
          <Books />
        </Route>
        <Route path="/users" exact={true}>
          <Users />
        </Route>
        <Route path="/users/:uid" exact={true}>
          <User />
        </Route>
      </Switch>
    );
  else
    appRoutes = (
      <Switch>
        <Route path="/sign" exact={true}>
          <Sign />
        </Route>
        {/* <Redirect to="/sign" /> */}
      </Switch>
    );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        admin,
        login,
        logout,
        userName,
      }}
    >
      <Router>
        <ButtonAppBar />
        <main>{appRoutes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
