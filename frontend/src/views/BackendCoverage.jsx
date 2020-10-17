import React from "react";
import axios from "axios";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table,} from "reactstrap";

class BackendCoverage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            test_finished: null,
            total_coverage: null,
            loc: null,
            ncloc: null,
            classes: null,
            method: null,
            statements: null,
            namespace: null,
            ignored_namespace: null,
            target_namespace: null,
            target_below_90pct: null,
            target_coverage: null,
            target_below_95pct: null,
            target_coverage_95pctplus: null,

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
        let url = "http://127.0.0.1:8000/api/backendcoverage";
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

    handleClick(id) {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({accessToken});
        var result = window.confirm("Want to delete?");
        if (result) {
            axios
                .post(
                    `http://127.0.0.1:8000/api/delete_bc/${id}`,
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
            // .catch(error => {
            //     this.props.history.push("/login");
            // });
        }
    }

    render() {
        const {users} = this.state;
        console.log(users);
        return (
            <>
                <div className="content">
                    {/* <div class="card">
                        <ul class="list-group list-group-flush">
                            <li className="list-group-item">PIC : Tiara</li>
                            <li className="list-group-item">
                                KPI : 99,9% 6 bulan
                            </li>
                            <li className="list-group-item">
                                Legends : Down Time is 50x count at one minutes
                                100 or garasi.id is not accessible by public{" "}
                            </li>
                        </ul>
                    </div> */}
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
                                            <th scope="col">
                                                Test Finished
                                            </th>
                                            <th scope="col">
                                                Total Coverage
                                            </th>
                                            <th scope="col">LOC</th>
                                            <th scope="col">NCLOC</th>
                                            <th scope="col">Classes%</th>
                                            <th scope="col">Method%</th>
                                            <th scope="col">Statements%</th>
                                            <th scope="col">Namespace</th>
                                            <th scope="col">Ignored Namespace</th>
                                            <th scope="col">Target Namespace</th>
                                            <th scope="col">Target Below 90%</th>
                                            <th scope="col">Target Coverage</th>
                                            <th scope="col">Target Below 95%</th>
                                            <th scope="col">Target Coverage 95%+</th>

                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {user.test_finished}
                                                    </td>
                                                    <td>
                                                        {user.total_coverage}
                                                    </td>
                                                    <td>{user.loc}</td>
                                                    <td>{user.ncloc}</td>
                                                    <td>{user.classes}</td>
                                                    <td>{user.method}</td>
                                                    <td>{user.statements}</td>
                                                    <td>{user.namespace}</td>
                                                    <td>{user.ignored_namespace}</td>
                                                    <td>{user.target_namespace}</td>
                                                    <td>{user.target_below_90pct}</td>
                                                    <td>{user.target_coverage}</td>
                                                    <td>{user.target_below_95pct}</td>
                                                    <td>{user.target_coverage_95pctplus}</td>

                                                    {/* <Link
                                                            to={`/admin/details-uptime/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Details
                                                            </button>
                                                        </Link> */}
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

export default BackendCoverage;