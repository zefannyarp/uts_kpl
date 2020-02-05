import React from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            date_time: null,
            avgPageLoadTime: null,
            id: null,
            chartData: null
        };
    }
    handleClick = event => {
        event.preventDefault();
        let labels = this.state.chartData.data.labels;
        let chartValues = this.state.chartData.data.datasets[0].data;
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });
        let url = "http://127.0.0.1:8000/api/frontend";

        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + accessToken
                }
            })
            .then(fedata => {
                this.setState({ chartData: null });
                labels.push(fedata.data.end_date);
                chartValues.push(parseFloat(fedata.data.avgPageLoadTime));

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
    };

    componentDidMount() {
        let config = { crossDomain: true };
        let labels = [];
        let chartValues = [];
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        this.setState({ accessToken });
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
        return (
            this.state.chartData && (
                <div className="content">
                    <div class="card">
                        <ul class="list-group list-group-flush">
                            <li className="list-group-item">PIC : Gino</li>
                            <li className="list-group-item">
                                Target: under 7 seconds
                            </li>
                        </ul>
                    </div>
                    <div className="content">
                        <Row>
                            <Col md="12">
                                <Card className="card-chart">
                                    <CardHeader>
                                        <CardTitle tag="h5">
                                            Frontend Performance
                                        </CardTitle>
                                        <p className="card-category">
                                            Garasi.Id
                                        </p>
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
                                        <hr />
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                            onClick={this.handleClick}
                                        >
                                            Generate
                                        </button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        );
    }
}

export default Dashboard;
