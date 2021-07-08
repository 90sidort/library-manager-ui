import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./context/auth.context";
import { useAuth } from "./hooks/auth.hook";
import Authors from "./components/Author/Authors";
import Books from "./components/Book/Books";
import Users from "./components/User/Users";
import ButtonAppBar from "./components/shared/Navigation";
import User from "./components/User/User";
import Book from "./components/Book/Book";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import Author from "./components/Author/Author";
import Reviews from "./components/Review/Reviews";
import Genres from "./components/Genre/Genres";
import Genre from "./components/Genre/Genre";
import Countries from "./components/Country/Countries";
import Country from "./components/Country/Country";
import AdminReview from "./components/Review/AdminReview";
import NotFound from "./components/shared/NotFound";

function App() {
  const { token, login, logout, userId, admin, userName } = useAuth();
  let appRoutes;
  console.log(token);
  if (token && admin)
    appRoutes = (
      <Switch>
        <Route path="/" exact={true}>
          <Books />
        </Route>
        <Route path="/users" exact={true}>
          <Users />
        </Route>
        <Route path="/authors" exact={true}>
          <Authors />
        </Route>
        <Route path="/genres" exact={true}>
          <Genres />
        </Route>
        <Route path="/genre/:gid" exact={true}>
          <Genre />
        </Route>
        <Route path="/countries" exact={true}>
          <Countries />
        </Route>
        <Route path="/country/:cid" exact={true}>
          <Country />
        </Route>
        <Route path="/users/:uid" exact={true}>
          <User />
        </Route>
        <Route path="/books/:bid" exact={true}>
          <Book />
        </Route>
        <Route path="/authors/:aid" exact={true}>
          <Author />
        </Route>
        <Route path="/reviews/:bid" exact={true}>
          <Reviews />
        </Route>
        <Route path="/review/" exact={true}>
          <AdminReview />
        </Route>
        <Route component={NotFound}></Route>
      </Switch>
    );
  else if (token && !admin)
    appRoutes = (
      <Switch>
        <Route path="/" exact={true}>
          <Books />
        </Route>
        <Route path="/profile/:uid" exact={true}>
          <User />
        </Route>
        <Route component={NotFound}></Route>
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
        <Route component={NotFound}></Route>
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
