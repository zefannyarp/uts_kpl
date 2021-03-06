import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "logo.svg";

var ps;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1
            ? "active"
            : "";
    }
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    render() {
        return (
            <div
                className="sidebar"
                data-color={this.props.bgColor}
                data-active-color={this.props.activeColor}
            >
                <div className="logo">
                    <a className="simple-text logo-mini"></a>
                    <a className="simple-text logo-normal">KPI Dashboard</a>
                </div>
                <div className="sidebar-wrapper" ref={this.sidebar}>
                    <Nav>
                        <li>
                            <NavLink to="/admin/dashboard">Main Menu</NavLink>
                        </li>
                        

                        <li>
                            <NavLink to="/admin/frontend-performance">
                                Frontend Performance
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/backendcoverage-menu">
                                Backend coverage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/schedulejobs-menu">
                                Schedule jobs
                            </NavLink>
                        </li>
                       
                        {/* {this.props.routes.map((prop, key) => {
              return (
                
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })} */}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
