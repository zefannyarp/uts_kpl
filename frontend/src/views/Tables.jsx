import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null
            // name: null,
            // username: null,
            // body: null,
            // id: null,
            // title: null
        };
    }

    componentWillMount() {
        let config = {crossDomain: true};
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({accessToken});
        let url = "http://127.0.0.1:8000/api/history";
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

    render() {
        const {users} = this.state;
        return (
            <>
                <div className="content">
                    <div class="card">
                        <ul class="list-group list-group-flush">
                            <li className="list-group-item">PIC : Tiara</li>
                            <li className="list-group-item">
                                KPI : 99,9% 6 bulan
                            </li>
                            <li className="list-group-item">
                                Legends : Down Time is 50x count at one minutes
                                more than 100 or garasi.id is not accessible by public{" "}
                            </li>
                        </ul>
                    </div>
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
                                            <th scope="col">Id</th>
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
                                                <tr key={index}>
                                                    <td>{user.id}</td>
                                                    <td>
                                                        {user.start_date}
                                                    </td>
                                                    <td>{user.end_date}</td>
                                                    <td>
                                                        {user.total_error}
                                                    </td>
                                                    <td>{user.downtime}</td>
                                                    <Link
                                                        to={`/admin/details-uptime/${user.id}`}
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
