import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// reactstrap components
import { Card, CardBody, Table, Row, Col } from "reactstrap";

class Generate extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            start_date: null,
            end_date: null,
            downtime: null,
            id: null,
            total_error: null,
            dateRange: false,
            record: null
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
        let date = new Date();
        let end_date = date.setDate(date.getDate());
        let start_date = date.setDate(date.getDate() - 6);
        this.setState({
            start_date: start_date,
            end_date: end_date
        });
    }

    handleChange = event => {
        this.setState({ start_date: event.target.value });
        this.setState({ end_date: event.target.value });
    };

    handleClick = event => {
        event.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/uptime", {
                start_date: new Date(this.state.start_date)
                    .getTime()
                    .toString(),
                end_date: new Date(this.state.end_date).getTime().toString()
            })
            .then(response => {
                console.log(response);
                this.setState({ record: response.data });
            })
            .catch(err => console.log(err));
    };

    toggleDateRange() {
        this.setState({ dateRange: !this.state.dateRange });
    }

    handleTypeChange(e) {
        if (e.target.value === "sevendays") {
            this.setDefaultDate();
            this.setState({ dateRange: false });
        } else {
            this.setState({ dateRange: true });
        }
    }

    render() {
        const { user } = this.state;
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
                                                    7 days
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
                                                Start Date
                                            </label>
                                            <div class="col-sm-10">
                                                <input
                                                    type="date"
                                                    class="form-control"
                                                    id="inputEmail3"
                                                    onChange={e => {
                                                        this.setState({
                                                            start_date:
                                                                e.target.value
                                                        });
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                                <form>
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
                                </form>
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
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th scope="col">START</th>
                                                <th scope="col">END</th>
                                                <th scope="col">TOTAL ERROR</th>
                                                <th scope="col">DOWNTIME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">
                                                    {
                                                        this.state.record
                                                            .start_date
                                                    }
                                                </td>
                                                <td scope="col">
                                                    {this.state.record.end_date}
                                                </td>
                                                <td scope="col">
                                                    {
                                                        this.state.record
                                                            .total_error
                                                    }
                                                </td>
                                                <td scope="col">
                                                    {this.state.record.downtime}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Link to={`/admin/uptime`}>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                        >
                                            Go
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
export default Generate;
