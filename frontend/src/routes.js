import Frontendperformance from "views/Notifications";
// import Notifications from "views/Notifications.jsx";
// import Icons from "views/Icons.jsx";
import Backendcoverage from "views/Typography.jsx";
import Tables from "views/Tables.jsx";
import Uptime2 from "views/Uptime2.jsx";
import UtamaUT from "views/UtamaUT.jsx";
import Generate from "views/Generate.jsx";
import Dashboard from "views/Dashboard.jsx";
// import Maps from "views/Map.jsx";
// import UserPage from "views/User.jsx";
// import UpgradeToPro from "views/Upgrade.jsx";

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
        component: Backendcoverage,
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
    }

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
