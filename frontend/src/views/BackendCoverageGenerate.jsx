import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
// reactstrap components
import {Card, CardBody, Col, Row, Table} from "reactstrap";

class BackendCoverageGenerate extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            test_finished: null,
            total_coverage: null,
            loc: null,
            ncloc: null,
            classes: null,
            method: null,
            statements: null,
            namespace: null,
            ignored_namespace: null,
            target_namespace: null,
            target_below_90pct: null,
            target_coverage: null,
            target_below_95pct: null,
            target_below_95pctplus: null,

        };

        this.toggleDateRange = this.toggleDateRange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setDefaultDate = this.setDefaultDate.bind(this);
        // this.saveDatatoAPI = this.saveDatatoAPI.bind(this);
    }

    componentDidMount() {
        this.setDefaultDate();
    }

    setDefaultDate() {
        let dut = new Date();
        let date = dut.setDate(dut.getDate());
        this.setState({
            dut: date,
        });
    }

    handleChange = event => {
        this.setState({date: event.target.value});
    };

    handleClick = event => {
        event.preventDefault();
        // const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        // this.setState({ accessToken });
        let url = "http://127.0.0.1:8000/api/new_bc";
        axios
            .post(
                url,
                {
                    date: new Date(this.state.date)
                        .getTime()
                        .toString(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: "bearer " + accessToken
                    }
                }
            )
            .then(response => {
                console.log(response);
                this.setState({record: response.data});
            })
        // .catch(error => {
        //     this.props.history.push("/login");
        // });
    };

    toggleDateRange() {
        this.setState({dateRange: !this.state.dateRange});
    }

    handleTypeChange(e) {
        if (e.target.value === "sevendays") {
            this.setDefaultDate();
            this.setState({dateRange: false});
        } else {
            this.setState({dateRange: true});
        }
    }

    render() {
        const {user} = this.state;
        console.log(this.state);
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <div class="card">
                            <div class="card-header">
                                <h5> Generate</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group row">
                                        <label
                                            for="staticEmail"
                                            class="col-sm-2 col-form-label"
                                        >
                                            Type
                                        </label>
                                        <div class="col-sm-10 col-form-label">
                                            <div class="form-check form-check-inline">
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="inlineRadio1"
                                                    value="sevendays"
                                                    checked={
                                                        !this.state.dateRange
                                                    }
                                                    onChange={
                                                        this.handleTypeChange
                                                    }
                                                ></input>
                                                <label
                                                    class="form-check-label"
                                                    for="inlineRadio1"
                                                >
                                                    Today
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="inlineRadio2"
                                                    value="manual"
                                                    onChange={
                                                        this.handleTypeChange
                                                    }
                                                ></input>
                                                <label
                                                    class="form-check-label"
                                                    for="inlineRadio2"
                                                >
                                                    Manual
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="card-body">
                                <form>
                                    <fieldset disabled={!this.state.dateRange}>
                                        <div class="form-group row">
                                            <label
                                                for="staticEmail"
                                                class="col-sm-2 col-form-label"
                                            >
                                                Date
                                            </label>
                                            <div class="col-sm-10">
                                                <input
                                                    type="date"
                                                    class="form-control"
                                                    id="inputEmail3"
                                                    onChange={e => {
                                                        this.setState({
                                                            date:
                                                            e.target.value
                                                        });
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                                {/* <form>
                                    <fieldset disabled={!this.state.dateRange}>
                                        <div class="form-group row">
                                            <label
                                                for="staticEmail"
                                                class="col-sm-2 col-form-label"
                                            >
                                                End Date
                                            </label>
                                            <div class="col-sm-10">
                                                <input
                                                    type="date"
                                                    class="form-control"
                                                    id="inputEmail3"
                                                    onChange={e => {
                                                        this.setState({
                                                            end_date:
                                                                e.target.value
                                                        });
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form> */}
                                <form
                                    method="post"
                                    onSubmit={e => this.handleSubmit(e)}
                                >
                                    <tr className="text-primary">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg btn-block"
                                            onClick={this.handleClick}
                                        >
                                            View Data
                                        </button>
                                    </tr>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
                {this.state.record && (
                    <Row>
                        {console.log(this.state.record)}
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th scope="col">
                                                Test Finished
                                            </th>
                                            <th scope="col">
                                                Total Coverage
                                            </th>
                                            <th scope="col">LOC</th>
                                            <th scope="col">NCLOC</th>
                                            <th scope="col">Classes%</th>
                                            <th scope="col">Method%</th>
                                            <th scope="col">Statements%</th>
                                            <th scope="col">Namespace</th>
                                            <th scope="col">Ignored Namespace</th>
                                            <th scope="col">Target Namespace</th>
                                            <th scope="col">Target Below 90%</th>
                                            <th scope="col">Target Coverage</th>
                                            <th scope="col">Target Below 95%</th>
                                            <th scope="col">Target Coverage 95%+</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td scope="col">
                                                {this.state.record.test_finished}
                                            </td>
                                            <td scope="col">
                                                {this.state.record.total_coverage}
                                            </td>
                                            <td scope="col">{this.state.record.loc}</td>
                                            <td scope="col">{this.state.record.ncloc}</td>
                                            <td scope="col">{this.state.record.classes}</td>
                                            <td scope="col">{this.state.record.method}</td>
                                            <td scope="col">{this.state.record.statements}</td>
                                            <td scope="col">{this.state.record.namespace}</td>
                                            <td scope="col">{this.state.record.ignored_namespace}</td>
                                            <td scope="col">{this.state.record.target_namespace}</td>
                                            <td scope="col">{this.state.record.target_below_90pct}</td>
                                            <td scope="col">{this.state.record.target_coverage}</td>
                                            <td scope="col"> {this.state.record.target_below_95pct}</td>
                                            <td scope="col">{this.state.record.target_coverage_95pctplus}</td>

                                            {/* <Link
                                                            to={`/admin/details-uptime/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Details
                                                            </button>
                                                        </Link> */}
                                        </tr>

                                        </tbody>
                                    </Table>
                                    <Link to={`/admin/backend-coverage`}>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                        >
                                            GO TO REPORT
                                        </button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

export default BackendCoverageGenerate;
