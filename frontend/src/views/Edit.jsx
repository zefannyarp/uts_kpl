import React from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: null,
            email: null,
            password: null,
            id: null,
            confirmpass: null
        };
    }

    componentDidMount() {
        let {location} = this.props;
        let pathURLArray = location.pathname.split("/");
        let config = {crossDomain: true};
        let id = pathURLArray[pathURLArray.length - 1];
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({accessToken});
        let url = `http://127.0.0.1:8000/api/admin/user/${id}`;
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + accessToken
                }
            })
            .then(users => {
                this.setState({
                    users: users.data,
                    name: users.data.name,
                    email: users.data.email
                });
            })
        // .catch(error => {
        //     this.props.history.push("/login");
        // });
    }

    handleChange = event => {
        this.setState({name: event.target.value});
        this.setState({email: event.target.value});
        this.setState({password: event.target.value});
    };

    handleClick = event => {
        event.preventDefault();
        const {password, confirmpass} = this.state;
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({accessToken});
        if (password !== confirmpass) {
            alert("Passwords don't match");
        } else {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/update",
                    {
                        name: this.state.name,
                        email: this.state.email,
                        id: this.state.users.id,
                        password: String(this.state.password)
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "bearer " + accessToken
                        }
                    }
                )
                .then(response => {
                    if (response.status && response.status === 200) {
                        this.props.history.push("/usermanage");
                    }
                })
                .catch(error => {
                    this.props.history.push("/login");
                });
        }
    };

    render() {
        // const { users } = this.state;
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
                                <CardTitle tag="h5"> Edit User</CardTitle>
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
                                            value={this.state.name}
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
                                            value={this.state.email}
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
                                                    confirmpass: e.target.value
                                                });
                                            }}
                                        ></input>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleClick}
                                    >
                                        Edit user
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

export default Edit;
