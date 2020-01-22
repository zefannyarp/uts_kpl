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
            response: [],
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
        axios
            .post("http://127.0.0.1:8000/api/summary",{
                start_date: new Date(this.state.start_date).getTime().toString(),
                end_date: new Date(this.state.end_date).getTime().toString()
            })
            .then(response => {
                console.log(response);
                this.setState({record: response.data});
            })
            .catch(err => console.log(err));
    };
    // componentWillMount() {
    //     let config = { crossDomain: true };
    //     let url = "http://127.0.0.1:8000/api/history";
    //     axios
    //         .get(url, { headers: { "Content-Type": "application/json" } })
    //         .then(users => {
    //             this.setState({
    //                 users: users.data
    //             });
    //             console.log(users);
    //         });
    // }
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
        const { response } = this.state;
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
                                            {response.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {user.start_date}
                                                        </td>
                                                        <td>{user.end_date}</td>
                                                        <td>
                                                            {user.total_error}
                                                        </td>
                                                        <td>{user.downtime}</td>
                                                        {/* <Link
                                                            to={`/admin/uptime2/${user.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                Details
                                                            </button>
                                                        </Link> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-lg"
                                    >
                                        Save Data
                                    </button>
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
