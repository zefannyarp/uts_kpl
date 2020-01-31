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
        let labels = [];
        let chartValues = [];
        let url = "http://127.0.0.1:8000/api/frontend";
        axios
            .get(url, { headers: { "Content-Type": "application/json" } })
            .then(fedata => {
                console.log(fedata.data);
                fedata.data.map(fe => {
                    labels.push(fe.date_time);
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
        let url = "http://127.0.0.1:8000/api/frontend/history";
        axios
            .get(url, { headers: { "Content-Type": "application/json" } })
            .then(fedata => {
                console.log(fedata.data);
                fedata.data.map(fe => {
                    labels.push(fe.date_time);
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
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card className="card-chart">
                                <CardHeader>
                                    <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                                    <p className="card-category">
                                        Line Chart with Points
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
                                    <Link to={"/admin/frontend-performance"}>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                            onClick={this.handleClick}
                                        >
                                            Generate
                                        </button>
                                    </Link>
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
