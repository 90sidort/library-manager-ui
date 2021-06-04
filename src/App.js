import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Sign from "./components/Sign";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign" exact={true}>
          <Sign />
        </Route>
        <Redirect to="/sign" />
      </Switch>
    </Router>
  );
}

export default App;
