import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from './Register';
import Home from "./Home";
import Header from "./Header/Header";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
 
]);

const Body = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Body;
