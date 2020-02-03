import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";

import Login from "./views/Login";
import Register from "views/Register";
import Loginadmin from "views/Loginadmin";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route
                path="/loginadmin"
                render={props => <Loginadmin {...props} />}
            />
            <Redirect to="/login" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
