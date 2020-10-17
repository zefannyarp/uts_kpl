import React from "react";
import { render } from "react-dom";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

class AdminMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        localStorage.clear();
    }

    render() {
        // if (localStorage.getItem("role") === "admin") {
            return (
                <>
                    <form>
                        <Link to={`/Login`}>
                            <button
                                type="button"
                                class="btn btn-outline-dark"
                                style={{
                                    marginTop: "2%",
                                    marginLeft: "90%"
                                }}
                                onClick={this.handleClick}
                            >
                                Logout
                            </button>
                        </Link>
                    </form>
                    <div
                        className="content"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignitem: "center",
                            position: "absolute",
                            top: "65%",
                            left: "50%",
                            height: "30%",
                            width: "50%",
                            margin: "-15% 0 0 -25%"
                        }}
                    >
                        <div className="container">
                            <Card className="col d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <a
                                                    href="/admin/dashboard"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Go to KPI Dashboard
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <a
                                                    href="/usermanage"
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Go to user management
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            );
        // } else {
        //     return <Redirect to="/admin/dashboard"></Redirect>;
        // }
    }
}

export default AdminMenu;
