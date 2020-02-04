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
            email: null
        };
    }

    componentWillMount() {
        let config = { crossDomain: true };
        let url = "http://127.0.0.1:8000/api/admin/user";
        axios
            .get(url, { headers: { "Content-Type": "application/json" } })
            .then(users => {
                this.setState({
                    users: users.data
                });
                console.log(users);
            });
    }

    handleClick = event => {
        event.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/uptime", {
                start_date: new Date(this.state.start_date)
                    .getTime()
                    .toString(),
                end_date: new Date(this.state.end_date).getTime().toString()
            })
            .then(response => {
                console.log(response);
                this.setState({ record: response.data });
            })
            .catch(err => console.log(err));
    };
    render() {
        const { users } = this.state;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">
                                        User Manage
                                        <button
                                            className="btn btn-primary"
                                            style={{
                                                position: "absolute",
                                                right: "35%",
                                                top: "6%",
                                                fontSize: "0.875em"
                                            }}
                                        >
                                            Add User
                                        </button>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table>
                                        <thead className="text-primary">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>

                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>

                                                        <Link
                                                            to={`/admin/details-uptime/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger">
                                                                Delete
                                                            </button>
                                                        </Link>
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
