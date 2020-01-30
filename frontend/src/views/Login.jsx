import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CardHeader, CardBody, CardTitle, Row, Col, Card } from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="4">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5"> Login</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form className="px-4 py-3">
                                    <div className="form-group">
                                        <label for="exampleDropdownFormEmail1">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleDropdownFormEmail1"
                                            placeholder="email@example.com"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleDropdownFormPassword1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleDropdownFormPassword1"
                                            placeholder="Password"
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
                                    <Link to={`/admin/dashboard`}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Sign in
                                        </button>
                                    </Link>
                                </form>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/Register">
                                    New around here? Sign up
                                </a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
