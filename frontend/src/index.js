import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";

import Login from "./views/Login";
import Register from "views/Register";
import Loginadmin from "views/Loginadmin";
import AdminMenu from "views/AdminMenu";
import UserManage from "views/UserManage";

const hist = createBrowserHistory();
const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE
};
const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <Login />
    </AlertProvider>
);

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route
                path="/adminmenu"
                render={props => <AdminMenu {...props} />}
            />
            <Route
                path="/usermanage"
                render={props => <UserManage {...props} />}
            />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route
                path="/loginadmin"
                render={props => <Loginadmin {...props} />}
            />
            <Redirect to="/login" />
            <Root />
        </Switch>
    </Router>,
    document.getElementById("root")
);
