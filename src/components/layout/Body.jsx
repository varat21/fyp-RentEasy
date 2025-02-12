import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";

import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
// import Rooms from "../Pages/properties/Rooms";
// import Rooms from '../properties/Rooms'
// import ShopHouses from "../properties/ShopHouses";
import About from '../Pages/About'
import Properties from "../properties/Apartment ";
import FAQ from "../Pages/FAQ";
import TermsAndConditions from '../Pages/TermsAndConditions'
import PrivacyPolicy from '../Pages/PrivacyPolicy'
// import Houses from "../properties/Houses";
import Contact from '../Pages/Contact'
// import Profile  from '../Pages/Profile'
import LandLord from '../properties/LandLord'
import Admin from '../Pages/Admin'
import AddProperties from "../properties/AddProperties";
import EmailVerification from "../Pages/VerifyEmail";
import ForgetPasswordModal from "../Pages/ForgetPassword/ForgetPasswordModal";
import UpdatePassword from "../Pages/ForgetPassword/UpdatePassword ";

import GetProfileData from "../Pages/Profile";
import Apartment from "../properties/Apartment ";

import ProtectedRoute from "./ProtectedRoute";
import GetPropertiesDetails from "../properties/GetPropertiesDetails";

// Layout component to include Header on all pages
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Renders the nested route components */}

      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/forgetPasswordModal",
     element:<ForgetPasswordModal/>
  },
  {
    path:"/updatePassword",
     element:<UpdatePassword/>
  },
 
  
  
  {
    element: <Layout />, // Wraps all routes that should include Header
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // {
      //   path: "/houses",
      //   element: <Houses />,
      // },
      // {
      //   path: "/rooms",
      //   element: <Rooms />,
      // },
      // {
      //   path: "/shopHouse",
      //   element: <ShopHouses />,
      // },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/apartment",
        element: <Apartment />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/terms", 
        element: <TermsAndConditions />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />,
      },
       {
        path: "/profile",
        element: <GetProfileData />,
      },
      {
        path: "/landlord",
        element: <LandLord />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path:"/logout",
         element:<Logout/>
      },
      {
        path: "/addProperties",
        element: (
          <ProtectedRoute>
            <AddProperties />
          </ProtectedRoute>
        ),
      },

      {
        path:"/emailVerification",
         element:<EmailVerification/>
      },
      {
        path:"/property/:id",
        element:<GetPropertiesDetails/>
      },

     
     
    ],
  },
]);

const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;
