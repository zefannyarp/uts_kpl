import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row,} from "reactstrap";

// reactstrap components

class BackendCoverageMenu extends React.Component {
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
                                        Backend Coverage Menu
                                        <p className="category"></p>
                                    </CardTitle>
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <Col className="ml-auto mr-auto" lg="8">
                                    <Row>
                                        <Col>
                                            <Link
                                                to={"/admin/backend-coverage"}
                                            >
                                                <Button
                                                    block
                                                    type="button"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Go To Backend Coverage
                                                    Report
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link
                                                to={
                                                    "/admin/backendcoverage-generate"
                                                }
                                            >
                                                <Button
                                                    block
                                                    type="button"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Generate New Backend
                                                    Coverage
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

export default BackendCoverageMenu;