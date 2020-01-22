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
            dateRange: false
        };

        this.toggleDateRange = this.toggleDateRange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.saveDatatoAPI = this.saveDatatoAPI.bind(this);
    }
    handleChange = event => {
        this.setState({ start_date: event.target.value });
        this.setState({ end_date: event.target.value });
    };
    // saveDatatoAPI(e) {
    //     debugger;
    //     e.preventDefault();
    //     const url = "http://127.0.0.1:8000/api/summary";
    //     const Data = {
    //         start_date: this.state.start_date,
    //         end_date: this.state.end_date
    //     };
    handleClick = event => {
        event.preventDefault();

        const Data = {
            start_date: new Date(this.state.start_date).getTime().toString(),
            end_date: new Date(this.state.end_date).getTime().toString()
        };
        console.log(Data);
        axios
            .post(
                "http://127.0.0.1:8000/api/summary",
                { Data },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => {
                console.log(response);
                let users = this.state.users;
                users.push(response.data);
                this.setState({});
            })
            .catch(err => console.log(err));
    };
    toggleDateRange() {
        this.setState({ dateRange: !this.state.dateRange });
    }

    handleTypeChange(e) {
        if (e.target.value === "sevendays") {
            this.setState({ dateRange: false });
        } else {
            this.setState({ dateRange: true });
        }
    }

    render() {
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
                                    <button onClick={this.handleClick}>
                                        View Data
                                    </button>
                                </form>
                                <form
                                    method="post"
                                    onSubmit={e => this.handleSubmit(e)}
                                >
                                    {/* <label>
                                        Person Name:
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <button type="submit">Add</button>
                                </form> */}

                                    <tr className="text-primary">
                                        <Link to={"/admin/uptime"}>
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg btn-block"
                                                onClick={this.handleClick}
                                            >
                                                View Data
                                            </button>
                                        </Link>
                                    </tr>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Generate;
