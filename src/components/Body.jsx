import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from './Register';
import Home from "./Home";
import Header from "./Header/Header";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/header",
    element: <Header/>,
  },
 
]);

const Body = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Body;
