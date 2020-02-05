import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
} from "reactstrap";

class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: null,
            id: null,
            email: null,
            role: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        let config = { crossDomain: true };
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });
        let url = "http://127.0.0.1:8000/api/admin/users";
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + accessToken
                }
            })
            .then(users => {
                this.setState({
                    users: users.data
                });
            })
            .catch(error => {
                this.props.history.push("/login");
            });
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    };

    handleLogout() {
        localStorage.clear();
    }

    handleClick(id) {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });
        var result = window.confirm("Want to delete?");
        if (result) {
            axios
                .post(
                    `http://127.0.0.1:8000/api/admin/delete/${id}`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "bearer " + accessToken
                        }
                    }
                )
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    this.props.history.push("/login");
                });
        }
    }
    render() {
        const { users } = this.state;
        return (
            <>
                <form>
                    <Link to={`/Login`}>
                        <button
                            type="button"
                            class="btn btn-outline-dark"
                            style={{
                                marginTop: "2%",
                                marginLeft: "90%"
                            }}
                            onClick={this.handleLogout}
                        >
                            Logout
                        </button>
                    </Link>
                </form>
                <div
                    className="container"
                    style={{
                        marginTop: "90px",
                        marginBottom: "5%"
                    }}
                >
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">
                                        User Management
                                        <Link to={`/Add`}>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                style={{
                                                    position: "absolute",
                                                    right: "25%",
                                                    top: "6%",
                                                    fontSize: "0.875em"
                                                }}
                                            >
                                                Add User
                                            </button>
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table>
                                        <thead className="text-primary">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>

                                                        <Link
                                                            to={`/edit/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                this.handleClick(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default UserManage;
