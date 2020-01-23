/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null,
            name: null,
            username: null,
            body: null,
            id: null,
            title: null
        };
    }
    componentWillMount() {
        let config = { crossDomain: true };
        let url = "http://127.0.0.1:8000/api/history";
        axios
            .get(url, { headers: { "Content-Type": "application/json" } })
            .then(users => {
                this.setState({
                    users: users.data
                });
                console.log(users);
            });
    }
    render() {
        const { users } = this.state;
        console.log(users);
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">
                                        Uptime Dashboard
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th scope="col">Start</th>
                                                <th scope="col">End</th>
                                                <th scope="col">Total Error</th>
                                                <th scope="col">Down Time</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => {
                                                return (
                                                    // <tr key={index}>
                                                    //     <td>{user.id}</td>
                                                    //     <td>{user.title}</td>
                                                    //     <td>{user.body}</td>
                                                    //     <Link
                                                    //         to={`/admin/uptime2/${user.id}`}
                                                    //     >
                                                    //         <button className="btn btn-primary">
                                                    //             Details
                                                    //         </button>
                                                    //     </Link>
                                                    <tr key={index}>
                                                        <td>
                                                            {user.start_date}
                                                        </td>
                                                        <td>{user.end_date}</td>
                                                        <td>
                                                            {user.total_error}
                                                        </td>
                                                        <td>{user.downtime}</td>
                                                        <Link
                                                            to={`/admin/uptime2`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Details
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

export default Tables;
