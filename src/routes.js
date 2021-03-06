import Alarm from "@material-ui/icons/Alarm";
import Appointments from "views/Appointments/Appointments.js";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import Emergency from "views/Emergency/Emergency.js";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Deals from "views/Deals/Deals.js";
import GoogleFit from "views/GoogleFit/GoogleFit.js";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsPage from "views/Notifications/Notifications.js";
import Share from "views/Share/Share.js";
import ShareIcon from "@material-ui/icons/Share";
import SmartDoc from "views/SmartDoc/SmartDoc.js";
import SmartDocIcon from "@material-ui/icons/TabletMac";
import TodayIcon from "@material-ui/icons/Today";
import UserProfile from "views/UserProfile/UserProfile.js";
import Supervisor from "views/Supervisor/Supervisor.js";
import FAQ from "views/FAQ/FAQ";
import Imprint from "views/Imprint/Imprint";
import ContactUs from "views/ContactUs/ContactUs";
import Premium from "views/Premium/Premium";
import SignIn from "views/Login/SignIn.js";
import SignUp from "views/Login/SignUp.js";

import Vaccination from "views/Vaccination/Vaccination.js";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// npm install --save-dev @iconify/react @iconify-icons/fa-solid
import { Icon, InlineIcon } from "@iconify/react";
// import syringeIcon from '@iconify-icons/fa-solid/syringe';
// import React from "react";

// // npm install --save-dev @iconify/react @iconify-icons/mdi
// // import { Icon, InlineIcon } from '@iconify/react';
// // import googleFit from '@iconify-icons/mdi/google-fit';

// // <Icon icon={googleFit} />

// function SyringeIcon() {
//   return <Icon style={{height:18,width:18}} icon={syringeIcon} />;
// };

const dashboardRoutes = [
  {
    path: "/signIn",
    name: "Sign In",
    rtlName: "???????? ??????????????",
    icon: FitnessCenterIcon,
    component: SignIn,
    layout: "/exists",
  },
  {
    path: "/signUp",
    name: "Sign Up",
    rtlName: "???????? ??????????????",
    icon: FitnessCenterIcon,
    component: SignUp,
    layout: "/exists",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "???????? ??????????????",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/sidebar",
  },
  {
    path: "/user",
    name: "Dein Profil",
    rtlName: "?????? ???????????? ????????????????",
    icon: AssignmentIndIcon,
    component: UserProfile,
    layout: "/navbar",
  },
  {
    path: "/deals",
    name: "Deals",
    rtlName: "?????????? ????????????",
    icon: "content_paste",
    component: Deals,
    layout: "/sidebar",
  },

  {
    path: "/notifications",
    name: "Benachrichtigungen",
    rtlName: "??????????????",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/navbar",
  },
  {
    path: "/collaboFinder",
    name: "Collabo Finder",
    rtlName: "??????????????",
    icon: SmartDocIcon,
    component: SmartDoc,
    layout: "/sidebar",
  },
  {
    path: "/doctor",
    name: "Premium Interactions",
    rtlName: "??????????????",
    icon: SupervisorAccountIcon,
    component: Supervisor,
    layout: "/supervisor",
  },
  {
    path: "/faq",
    name: "FAQ",
    rtlName: "??????????????",
    icon: SupervisorAccountIcon,
    component: FAQ,
    layout: "/footer",
  },
  {
    path: "/imprint",
    name: "Impressum",
    rtlName: "??????????????",
    icon: SupervisorAccountIcon,
    component: Imprint,
    layout: "/footer",
  },
  {
    path: "/contactUs",
    name: "Kontakt",
    rtlName: "??????????????",
    icon: SupervisorAccountIcon,
    component: ContactUs,
    layout: "/footer",
  },
  {
    path: "/premium",
    name: "Premium",
    rtlName: "??????????????",
    icon: SupervisorAccountIcon,
    component: Premium,
    layout: "/NavBar",
  },
];

export default dashboardRoutes;
