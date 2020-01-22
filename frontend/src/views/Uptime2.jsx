import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
} from "reactstrap";

class Uptime2 extends React.Component {
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
    componentDidMount() {
        let { match } = this.props;
        console.log(match.params.id);
        const { id } = this.props.match.params;
        let url = `http://127.0.0.1:8000/api/articles/${id}`;

        axios
            .get(url, { headers: { "Content-Type": "application/json" } })
            .then(users => {
                this.setState({
                    users: users.data
                });
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
                                        Uptime Dashboard per Hari
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Time</th>
                                                <th></th>
                                                <th>DownTime</th>
                                                <th className="text-right">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {users.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{user.title}</td>
                                                        <td>{user.body}</td>
                                                        <td></td> */}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">
                                                    <Link to={"/admin/uptime0"}>
                                                        <button
                                                            className="btn btn-primary"
                                                            size="sm"
                                                        >
                                                            Menu
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                            {/* ); })} */}
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

export default Uptime2;
