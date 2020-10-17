import React from "react";
import { Link } from "react-router-dom";
import {
    Alert,
    UncontrolledAlert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

// reactstrap components

class ScheduleJobsMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            name: null,
            username: null,
            body: null,
            id: null,
            title: null,
        };
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Col
                                    className="ml-auto mr-auto text-center"
                                    md="200"
                                >
                                    <CardTitle tag="h1">
                                        Schedule Jobs Menu
                                        <p className="category"></p>
                                    </CardTitle>
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <Col className="ml-auto mr-auto" lg="8">
                                    <Row>
                                        <Col>
                                            <Link to={"/admin/schedule-jobs"}>
                                                <Button
                                                    block
                                                    type="button"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Go To Schedule Jobs Report
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link
                                                to={
                                                    "/admin/schedulejobs-generate"
                                                }
                                            >
                                                <Button
                                                    block
                                                    type="button"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Generate New Schedule Jobs
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ScheduleJobsMenu;