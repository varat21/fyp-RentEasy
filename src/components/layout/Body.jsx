import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import WhatsApps from "../Pages/whatApps";
import ProtectedRoute from "./ProtectedRoute";
import { NotFoundImage } from "../NotFoundImage";
// import PaymentButton from "../Pages/PaymentButton";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
// import BookingInformation from "../Admin/BookingInformation";   
import PaymentInformation from "../Admin/PaymentInformation";
import BookingInformation from "../Admin/bookingInformation";
import KhaltiPayment from "../Pages/khaltiPayment";

// Lazy load components
const Login = lazy(() => import("../Pages/Login"));
const Logout = lazy(() => import("../Pages/Logout"));
const Register = lazy(() => import("../Pages/Register"));
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const FAQ = lazy(() => import("../Pages/FAQ"));
// const TermsAndConditions = lazy(() => import("../Pages/TermsAndConditions"));
// const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const Contact = lazy(() => import("../Pages/Contact"));
// const LandLord = lazy(() => import("../properties/LandLord"));
const AddProperties = lazy(() => import("../properties/AddProperties"));
const EmailVerification = lazy(() => import("../Pages/VerifyEmail"));

const ForgetPasswordModal = lazy(() =>
  import("../Pages/ForgetPassword/ForgetPasswordModal")
);
const UpdatePassword = lazy(() =>
  // import("../Pages/ForgetPassword/UpdatePassword")
import("../Pages/ForgetPassword/UpdatePassword ")
);

const GetProfileData = lazy(() => import("../Pages/Profile"));
const GetPropertiesDetails = lazy(() =>
  import("../properties/GetPropertiesDetails")
);
// const Properties = lazy(() => import("../properties/Properties"));

// Admin Components
const Navbar = lazy(() => import("../Admin/navbar/Navbar"));
const Dashboard = lazy(() => import("../Admin/Dashboard"));
const Users = lazy(() => import("../Admin/Users"));
const AddedProperties = lazy(() => import("../Admin/AddedProperties"));
const UserProfileDetails = lazy(()=>import("../Admin/UserProfileDetails"));
const PropertiesDetails = lazy(() => import("../Admin/PropertiesDetails"));
const Message =lazy(()=>import("../Admin/message"));
const PropertyDocument = lazy(() => import("../Admin/PropertyDocument"));

// Layout component
const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <WhatsApps />
      <Footer />
    </>
  );
};

// Define router configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/forgetPasswordModal",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetPasswordModal />
      </Suspense>
    ),
  },
  {
    path: "/updatePassword",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UpdatePassword />
      </Suspense>
    ),
  },
  {
    path: "/navbar",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "addedProperties",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddedProperties />
          </Suspense>
        ),
      },
      {
        path: "bookingInformation",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BookingInformation/>
          </Suspense>
        ),
      },


      {
        path: "paymentInformation",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentInformation />
          </Suspense>
        ),
      },
      {
        path: "userProfileDetails/:id", // Dynamic id parameter
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfileDetails />
          </Suspense>
        ),
      },
      {
        path: "propertiesDetails/:id", // Dynamic id parameter
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PropertiesDetails />
          </Suspense>
        ),
      },
      {
        path: "message", // Dynamic id parameter
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Message />
          </Suspense>
        ),
      },
      {
        path:"propertyDocument",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PropertyDocument />
          </Suspense>
        )
      }

    ],
  },
  {
    element: <Layout />, // Layout with Header & Footer
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      // {
      //   path: "/payment",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <PaymentButton/>
      //     </Suspense>
      //   ),
      // },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQ />
          </Suspense>
        ),
      },
      // {
      //   path: "/properties",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <Properties />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/terms",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <TermsAndConditions />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/privacyPolicy",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <PrivacyPolicy />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GetProfileData />
          </Suspense>
        ),
      },
      // {
      //   path: "/landlord",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <LandLord />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "/addProperties",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <AddProperties />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/emailVerification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EmailVerification />
          </Suspense>
        ),
      },
      // {
      //   path: "/blogs",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <Blogs />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/property/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GetPropertiesDetails />
          </Suspense>
        ),
      },
      {
        path: "/paymentSuccess",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccess />
          </Suspense>
        ),
      },
      {
        path: "/khaltiPayment",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <KhaltiPayment />
          </Suspense>
        ),
      },
     
      {
        path: "*",
        element: <NotFoundImage />,
      },
    ],
  },
]);

// Body component
const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;


