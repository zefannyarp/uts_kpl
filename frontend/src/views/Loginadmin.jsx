import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CardHeader, CardBody, CardTitle, Row, Col, Card } from "reactstrap";

class Loginadmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: null,
            password: null
        };
    }
    handleChange = event => {
        this.setState({ email: event.target.value });
        this.setState({ password: event.target.value });
    };

    handleClick = event => {
        event.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/login", {
                email: new String("admin"),
                password: new String(this.state.password)
            })
            .then(response => {
                if (response.status && response.status === 201) {
                    this.props.history.push("/adminmenu");
                }
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
                    margin: "-15% 0 0 -25%"
                }}
            >
                <Row>
                    <Col md="12">
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
                                            placeholder="admin"
                                            onChange={e => {
                                                this.setState({
                                                    email: e.target.value
                                                });
                                            }}
                                            disabled
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

export default Loginadmin;
