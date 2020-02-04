import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CardHeader, CardBody, CardTitle, Row, Col, Card } from "reactstrap";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            name: null,
            email: null,
            password: null
        };
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
        this.setState({ email: event.target.value });
        this.setState({ password: event.target.value });
    };
    handleClick = event => {
        event.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/register", {
                name: new String(this.state.name),
                email: new String(this.state.email),
                password: new String(this.state.password)
            })
            .then(response => {
                if (response.status && response.status === 201) {
                    this.props.history.push("/login");
                }
            });
    };

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    {" "}
                                    Create Your Account
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form className="px-4 py-3">
                                    <div className="form-group">
                                        <label for="exampleDropdownFormEmail1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleDropdownFormText1"
                                            placeholder="Name"
                                            onChange={e => {
                                                this.setState({
                                                    name: e.target.value
                                                });
                                            }}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleDropdownFormEmail1">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleDropdownFormEmail1"
                                            placeholder="email@example.com"
                                            onChange={e => {
                                                this.setState({
                                                    email: e.target.value
                                                });
                                            }}
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
                                            onChange={e => {
                                                this.setState({
                                                    password: e.target.value
                                                });
                                            }}
                                        ></input>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleDropdownFormPassword1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleDropdownFormPassword1"
                                            placeholder="Confirm Password"
                                        ></input>
                                    </div> */}

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
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleClick}
                                    >
                                        Sign Up
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

export default Register;
