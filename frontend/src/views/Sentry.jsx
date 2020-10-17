import React from "react";
import axios from "axios";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table,} from "reactstrap";

class Sentry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            date: null,
            total: null,
            new: null,
            high: null,
        };
    }

    componentWillMount() {
        let config = {crossDomain: true};
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({accessToken});
        let url = "http://127.0.0.1:8000/api/sentry";
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
        console.log(users);
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
                                > 100 or garasi.id is not accessible by public{" "}
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
                                            <th scope="col">Date</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">New</th>
                                            <th scope="col">HIGH</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{user.date}</td>
                                                    <td>{user.total}</td>
                                                    <td>{user.new}</td>
                                                    <td>{user.high}</td>
                                                    {/* <Link
                                                            to={`/admin/details-uptime/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Details
                                                            </button>
                                                        </Link> */}
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

export default Sentry;