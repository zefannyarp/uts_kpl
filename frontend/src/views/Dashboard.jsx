import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Table
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart
} from "variables/charts.jsx";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null,
            accessToken: null
        };
    }

    componentDidMount() {
        // console.log(localStorage.getItem('accessToken'));
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });

        let url_uptime = "http://127.0.0.1:8000/api/history";
        axios
            .get(url_uptime, {
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
        let labels = [];
        let chartValues = [];
        let url_frontend = "http://127.0.0.1:8000/api/frontend/history";
        axios
            .get(url_frontend, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + accessToken
                }
            })
            .then(fedata => {
                fedata.data.map(fe => {
                    labels.push(fe.end_date);
                    chartValues.push(parseFloat(fe.avgPageLoadTime));
                });

                const FEPerformanceData = {
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: chartValues,
                                fill: false,
                                borderColor: "#51CACF",
                                backgroundColor: "transparent",
                                pointBorderColor: "#51CACF",
                                pointRadius: 4,
                                pointHoverRadius: 4,
                                pointBorderWidth: 8
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                            position: "top"
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        max: 15,
                                        stepSize: 5
                                    }
                                }
                            ]
                        }
                    }
                };

                this.setState({ chartData: FEPerformanceData });
            });
    }

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
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="card-chart">
                                <CardHeader>
                                    <CardTitle tag="h5">
                                        Frontend Performance
                                    </CardTitle>
                                    <p className="card-category">Garasi.Id</p>
                                </CardHeader>
                                <CardBody>
                                    {this.state.chartData ? (
                                        <Line
                                            data={this.state.chartData.data}
                                            options={
                                                this.state.chartData.options
                                            }
                                            width={400}
                                            height={100}
                                        />
                                    ) : null}
                                </CardBody>
                                <CardFooter>
                                    <div className="chart-legend">
                                        <i className="fa fa-circle text-info" />{" "}
                                        Frontend Performance{" "}
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
