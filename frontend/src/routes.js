import Frontendperformance from "views/Notifications";
// import Backendcoverage from "views/Typography.jsx";
import Tables from "views/Tables.jsx";
import Uptime2 from "views/Uptime2.jsx";
import UtamaUT from "views/UtamaUT.jsx";
import Generate from "views/Generate.jsx";
import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import Register from "views/Register.jsx";
import Loginadmin from "views/Loginadmin";
import AdminMenu from "views/AdminMenu";
import UserManage from "views/UserManage";
import Add from "views/Add";
import Edit from "views/Edit";
import BackendCoverage from "./views/BackendCoverage";
import Sentry from "./views/Sentry";
import ScheduleJobs from "./views/ScheduleJobs";
import ScheduleJobsMenu from "views/ScheduleJobsMenu";
import ScheduleJobsGenerate from "views/ScheduleJobsGenerate";
import BackendCoverageMenu from "views/BackendCoverageMenu";
import BackendCoverageGenerate from "views/BackendCoverageGenerate";
var routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: Dashboard,
        layout: "/admin"
    },

    {
        path: "/backend-coverage",
        name: "Backend coverage",
        icon: "nc-icon nc-caps-small",
        component: BackendCoverage,
        layout: "/admin"
    },
    {
        path: "/uptime-menu",
        name: "UptimeReport",
        component: UtamaUT,
        layout: "/admin"
    },
    {
        path: "/uptime",
        name: "UptimeReport",
        icon: "nc-icon nc-tile-56",
        component: Tables,
        layout: "/admin"
    },

    {
        path: "/details-uptime/:id",
        name: "UptimeReport",
        component: Uptime2,
        layout: "/admin"
    },

    {
        path: "/generate",
        name: "UptimeReport",
        component: Generate,
        layout: "/admin"
    },

    {
        path: "/frontend-performance",
        name: "Frontend Performance",
        component: Frontendperformance,
        layout: "/admin"
    },

    {
        path: "/login",
        name: "Login",
        component: Login
    },

    {
        path: "/register",
        name: "Register",
        component: Register
    },

    {
        path: "/loginadmin",
        name: "Login admin",
        component: Loginadmin
    },
    {
        path: "/adminmenu",
        name: "Admin menu",
        component: AdminMenu
    },
    {
        path: "/usermanage",
        name: "User Manage ",
        component: UserManage
    },
    {
        path: "/add",
        name: "Add ",
        component: Add
    },
    {
        path: "/edit/:id",
        name: " Edit ",
        component: Edit
    },
    {
        path: "/schedule-jobs",
        name: " ScheduleJobs ",
        component: ScheduleJobs,
        layout: "/admin"
    },
    {
        path: "/sentry",
        name: " Sentry ",
        component: Sentry,
        layout: "/admin"
    },
    {
        path: "/schedulejobs-menu",
        name: " Schedule Jobs Menu ",
        component: ScheduleJobsMenu,
        layout: "/admin"
    },
    {
        path: "/schedulejobs-generate",
        name: " Schedule Jobs Generate ",
        component: ScheduleJobsGenerate,
        layout: "/admin",
    },
    {
        path: "/backendcoverage-menu",
        name: " Backend Coverage Menu ",
        component: BackendCoverageMenu,
        layout: "/admin",
    },
    {
        path: "/backendcoverage-generate",
        name: " Backend Coverage Generate ",
        component: BackendCoverageGenerate,
        layout: "/admin",
    },

    // {
    //   path: "/icons",
    //   name: "Icons",
    //   icon: "nc-icon nc-diamond",
    //   component: Icons,
    //   layout: "/admin"
    // },
    // {
    //   path: "/maps",
    //   name: "Maps",
    //   icon: "nc-icon nc-pin-3",
    //   component: Maps,
    //   layout: "/admin"
    // },
    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: "nc-icon nc-bell-55",
    //   component: Notifications,
    //   layout: "/admin"
    // },
    // {
    //   path: "/user-page",
    //   name: "User Profile",
    //   icon: "nc-icon nc-single-02",
    //   component: UserPage,
    //   layout: "/admin"
    // },

    // {
    //   pro: true,
    //   path: "/upgrade",
    //   name: "Upgrade to PRO",
    //   icon: "nc-icon nc-spaceship",
    //   component: UpgradeToPro,
    //   layout: "/admin"
    // }
];

export default routes;
