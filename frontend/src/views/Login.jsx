import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CardHeader, CardBody, CardTitle, Row, Col, Card } from "reactstrap";
import { useAlert } from "react-alert";
// import "./App.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: null,
            password: null,
            access_token: null,
            record: null,
            role: null,
        };
    }

    isAdmin() {
        if (localStorage.getItem("role") === "admin") {
            return true;
        } else {
            return false;
        }
    }
    componentWillMount() {
        if ("accessToken" in localStorage && this.isAdmin()) {
            this.props.history.push("/adminmenu");
        } else if ("accessToken" in localStorage && this.isAdmin()) {
            this.props.history.push("/admin/dashboard");
        }
    }

    handleChange = (event) => {
        this.setState({ email: event.target.value });
        this.setState({ password: event.target.value });
    };

    handleClick = (event) => {
        event.preventDefault();
        console.log(this.props);
        axios
            .post("http://127.0.0.1:8000/api/auth/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                // this.setState({ record: response.data });
                console.log(response);
                if (response.status && response.status === 200) {
                    localStorage.setItem(
                        "accessToken",
                        response.data.access_token
                    );
                    localStorage.setItem("role", response.data.role);
                    if (response.data.role === "admin") {
                        this.props.history.push("/adminmenu");
                    } else {
                        this.props.history.push("/admin/dashboard");
                    }
                    axios.defaults.headers.common["Authorization"] =
                        response.data.access_token;
                    // this.props.history.push("/admin/dashboard");
                }
            })
            .catch((error) => {
                alert("wrong email or password");
            });
    };

    render() {
        return (
            <div
                className="content"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignitem: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    height: "30%",
                    width: "50%",
                    margin: "-15% 0 0 -25%",
                }}
            >
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle
                                    tag="h2"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    SELAMAT DATANG DI KPI DASHBOARD
                                </CardTitle>
                                <img
                                    src="/garasi.png"
                                    fluid
                                    style={{
                                        widht: "45px",
                                        height: "45px",
                                        marginLeft: "45%",
                                    }}
                                ></img>
                            </CardHeader>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5"> Login</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form className="px-4 py-3">
                                    <div className="form-group">
                                        <label htmlFor="exampleDropdownFormEmail1">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleDropdownFormEmail1"
                                            placeholder="example@gmail.com"
                                            onChange={(e) => {
                                                this.setState({
                                                    email: e.target.value,
                                                });
                                            }}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleDropdownFormPassword1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleDropdownFormPassword1"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value,
                                                });
                                            }}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="dropdownCheck"
                                            ></input>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleClick}
                                    >
                                        Sign in
                                    </button>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;