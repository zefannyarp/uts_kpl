import React from "react";
import { Line, Pie } from "react-chartjs-2";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";

import { dashboardNASDAQChart } from "variables/charts.jsx";

class Dashboard extends React.Component {
    render() {
        return (
            <>
                <div>
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
                                    <Line
                                        data={dashboardNASDAQChart.data}
                                        options={dashboardNASDAQChart.options}
                                        width={400}
                                        height={100}
                                    />
                                </CardBody>
                                <CardFooter>
                                    <div className="chart-legend">
                                        <i className="fa fa-circle text-info" />{" "}
                                        Tesla Model S{" "}
                                        <i className="fa fa-circle text-warning" />{" "}
                                        BMW 5 Series
                                    </div>
                                    <hr />
                                    <div className="card-stats">
                                        <i className="fa fa-check" /> Data
                                        information certified
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
