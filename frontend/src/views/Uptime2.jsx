import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginacionTabla from "./User.jsx";

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
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null,
            record: null,
            date_time: null,
            request_name: null,
            nocolumns: 3
        };
    }

    componentDidMount() {
        let { match } = this.props;
        console.log(match.params.id);
        const { id } = this.props.match.params;
        let url = `http://127.0.0.1:8000/api/uptime/${id}`;

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
                                        Uptime Dashboard in Hour
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Date/Time</th>

                                                <th scope="col">Request</th>
                                            </tr>
                                        </thead>
                                        <PaginacionTabla
                                            itemsperpage={
                                                this.state.itemsperpage
                                            }
                                            nocolumns={this.state.nocolumns}
                                            items={users.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td scope="col">
                                                            {user.id}
                                                        </td>
                                                        <td scope="col">
                                                            {user.date_time}
                                                        </td>
                                                        <td scope="col">
                                                            {user.request_name}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            pagesspan={3}
                                        />
                                        <tbody>
                                            {/* {users.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td scope="col">
                                                            {user.id}
                                                        </td>
                                                        <td scope="col">
                                                            {user.date_time}
                                                        </td>
                                                        <td scope="col">
                                                            {user.request_name}
                                                        </td>
                                                    </tr>
                                                );
                                            })} */}
                                        </tbody>
                                    </Table>
                                    <Link to={"/admin/uptime-menu"}>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                        >
                                            Back To Menu
                                        </button>
                                    </Link>
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
