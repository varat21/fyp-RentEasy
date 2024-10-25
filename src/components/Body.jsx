// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import Home from "./Home";
// import Header from "./Header/Header";
// import Rooms from "./Rooms";
// import ShopHouses from "./ShopHouses";
// import About from "./About";
// import Properties from "./Properties";
// import FAQ from "./FAQ";
// import TermsAndConditions from "./TermsAndConditions";
// import PrivacyPolicy from "./PrivacyPolicy";
// import Houses from "./Houses";
// import Contact from './Contact'

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login/>,
//   },

//   {
//     path: "/",
//     element: <Header />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/contact",
//     element: <Contact/>,
//   },
//   {
//     path: "/houses",
//     element: <Houses />,
//   },
//   {
//     path:"/rooms",
//   element: <Rooms/>,
// },
// {
//   path:"/shopHouses",
// element: <ShopHouses/>,
// },
// {
//   path:"/about",
// element: <About/>,
// },
// {
//   path:"/properties",
// element: <Properties/>,
// },
// {
//   path:"/faq",
// element: <FAQ/>,
// },
// {
//   path:"/termsAndConditions",
// element: <TermsAndConditions/>,
// },
// {
//   path:"/privacyPolicy",
// element: <PrivacyPolicy/>,
// }
// ]);

// const Body = () => {
//   return <RouterProvider router={router} />;
// };

// export default Body;



import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Header from "./Header/Header";
import Rooms from "./Rooms";
import ShopHouses from "./ShopHouses";
import About from "./About";
import Properties from "./Properties";
import FAQ from "./FAQ";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import Houses from "./Houses";
import Contact from "./Contact";
import Profile from "./Profile";
// Layout component to include Header on all pages
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Renders the nested route components */}
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
      {
        path: "/houses",
        element: <Houses />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/shopHouse",
        element: <ShopHouses />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/properties",
        element: <Properties />,
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
        element: <Profile />,
      },
    ],
  },
]);

const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;
