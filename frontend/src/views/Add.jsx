import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CardHeader, CardBody, CardTitle, Row, Col, Card } from "reactstrap";

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            password_comfimation: null,
            role: null,
            fields: {},
            errors: {}
        };
    }
 
    handleChange = event => {
        this.setState({ name: event.target.value });
        this.setState({ email: event.target.value });
        this.setState({ password: event.target.value });
        this.setState({ password_comfimation: event.target.value });
        this.setState({ role: event.target.value });
    };
    handleClick = event => {
        
        event.preventDefault();
        const { password, password_comfimation, name, email} = this.state;
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });
        // perform all neccassary validations
        if (name == null) {
            alert("Silahkan mengisi kolom nama");
        } else {
            if (email == null) {
                alert("Silahkan mengisi kolom email");
             } else {
                    if (password == null) {
                        alert("Silahkan mengisi kolom password");
            } else {
        if (password !== password_comfimation) {
            alert("Password harus sama");
        } else {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/add",
                    {
                        name: new String(this.state.name),
                        email: new String(this.state.email),
                        password: new String(this.state.password),
                        role: new String(this.state.role)
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "bearer " + accessToken
                        }
                    }
                )

                .then(response => {
                    if (response.status && response.status === 201) {
                        this.props.history.push("/usermanage");
                    } else {
                        window.location.reload();
                    }
                })
                // .catch(error => {
                //     this.props.history.push("/login");
                // });
        }}}}
    };

    render() {
        return (
            <div
                className="container"
                style={{
                    marginTop: "10%",
                    marginBottom: "5%"
                }}
            >
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5"> Add User</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form className="px-4 py-3" >
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
                                    <div className="form-group">
                                        <label for="exampleDropdownFormPassword1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleDropdownFormPassword1"
                                            placeholder="Confirm Password"
                                            onChange={e => {
                                                this.setState({
                                                    password_comfimation:
                                                        e.target.value
                                                });
                                            }}
                                        ></input>
                                    </div>
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="exampleDropdownFormPassword1">*/}
                                    {/*        Role*/}
                                    {/*    </label>*/}
                                    {/*    <input*/}
                                    {/*        type="radio"*/}
                                    {/*        className="form-control"*/}
                                    {/*        id="role"*/}
                                    {/*        onChange={e => {*/}
                                    {/*            this.setState({*/}
                                    {/*                password: e.target.value*/}
                                    {/*            });*/}
                                    {/*        }}*/}
                                    {/*    ></input>*/}
                                    {/*</div>*/}


                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleClick}
                                    >
                                        Add User
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

export default Add;
