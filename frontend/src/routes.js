/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
        path: "/backendcoverage",
        name: "Backend coverage",
        icon: "nc-icon nc-caps-small",
        component: Backendcoverage,
        layout: "/admin"
    },
    {
        path: "/uptime0",
        name: "Uptime",
        component: UtamaUT,
        layout: "/admin"
    },
    {
        path: "/uptime",
        name: "Uptime",
        icon: "nc-icon nc-tile-56",
        component: Tables,
        layout: "/admin"
    },

    {
        path: "/uptime2",
        name: "Uptime",
        component: Uptime2,
        layout: "/admin"
    },

    {
        path: "/generate",
        name: "Uptime",
        component: Generate,
        layout: "/admin"
    },

    {
        path: "/frontendperformance",
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
