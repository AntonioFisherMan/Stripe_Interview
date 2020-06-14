import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./components/Pages/FrontPage";
import NavContainer from "./components/Nav/NavContainer";
import Login from "./components/Forms/Login/Login";
import Register from "./components/Forms/Register/Register";
import Account from "./components/Pages/Account";
import AuthStripe from "./components/AuthStripe/AuthStripe";



function App() {

  return (
    <div className="App">
      <Router>
        <NavContainer/>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/auth/:scope?/:code?" component={AuthStripe} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
