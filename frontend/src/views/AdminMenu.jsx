import React from "react";
import { render } from "react-dom";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";

class AdminMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className="content">
                    <div className="card w-100">
                        <div className="card-body">
                            <h5 className="card-title">KPI Dashboard</h5>
                            <p className="card-text">
                                Admin ica melihat kpi db uhuy
                            </p>
                            <a
                                href="/admin/dashboard"
                                className="btn btn-primary"
                            >
                                Go
                            </a>
                        </div>
                    </div>

                    <div className="card w-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage User</h5>
                            <p className="card-text">
                                Admin ica
                                balbalblablablalbalbalbalblablablablabal
                            </p>
                            <a href="/usermanage" className="btn btn-primary">
                                Go
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminMenu;
