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
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null,
            record: null,
            datetime: null,
            request: null,
            name: null,
            username: null,
            body: null,
            id: null,
            title: null
        };
    }
    // componentDidMount() {
    //     let { match } = this.props;
    //     console.log(match.params.id);
    //     const { id } = this.props.match.params;
    //     let url = `http://127.0.0.1:8000/api/articles/${id}`;

    //     axios
    //         .get(url, { headers: { "Content-Type": "application/json" } })
    //         .then(users => {
    //             this.setState({
    //                 users: users.data
    //             });
    //         });
    // }

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
                                                <th scope="col">Time</th>

                                                <th scope="col">Request</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">
                                                    {this.state.users.title}
                                                </td>
                                                <td scope="col">
                                                    {this.state.users.body}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Link to={"/admin/uptime0"}>
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
//         const { users } = this.state;
//         return (
//             <>
//                 <h1>{users.title}</h1>
//                 <p>{users.body}</p>
//             </>
//         );
//     }
// }
export default Uptime2;
