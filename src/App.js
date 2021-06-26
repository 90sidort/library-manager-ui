import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthContext } from "./context/auth.context";
import { useAuth } from "./hooks/auth.hook";
import Books from "./components/Book/Books";
import Users from "./components/User/Users";
import ButtonAppBar from "./components/shared/Navigation";
import User from "./components/User/User";
import Book from "./components/Book/Book";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";

function App() {
  const { token, login, logout, userId, admin, userName } = useAuth();
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
        <Route path="/books/:bid" exact={true}>
          <Book />
        </Route>
      </Switch>
    );
  else
    appRoutes = (
      <Switch>
        <Route path="/signup" exact={true}>
          <SignUp />
        </Route>
        <Route path="/signin" exact={true}>
          <SignIn />
        </Route>
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
