import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class UtamaUT extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            name: null,
            username: null,
            body: null,
            id: null,
            title: null
        };
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Uptime Menu</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <thead>
                                    <tr className="text-primary">
                                        <Link to={"/admin/uptime"}>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg btn-block"
                                            >
                                                Report
                                            </button>
                                        </Link>
                                    </tr>
                                    <tr className="text-primary">
                                        <Link to={"/admin/generate"}>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg btn-block"
                                            >
                                                Generate Report
                                            </button>
                                        </Link>
                                    </tr>
                                </thead>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UtamaUT;
