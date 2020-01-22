import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";
// core components
import { dashboardEmailStatisticsChart } from "variables/charts.jsx";
class Typography extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Email Statistics</CardTitle>
                                <p className="card-category">
                                    Last Campaign Performance
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Pie
                                    data={dashboardEmailStatisticsChart.data}
                                    options={
                                        dashboardEmailStatisticsChart.options
                                    }
                                />
                            </CardBody>
                            <CardFooter>
                                <div className="legend">
                                    <i className="fa fa-circle text-primary" />{" "}
                                    Opened{" "}
                                    <i className="fa fa-circle text-warning" />{" "}
                                    Read{" "}
                                    <i className="fa fa-circle text-danger" />{" "}
                                    Deleted{" "}
                                    <i className="fa fa-circle text-gray" />{" "}
                                    Unopened
                                </div>
                                <hr />
                                <div className="stats">
                                    <i className="fa fa-calendar" /> Number of
                                    emails sent
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Typography;
