import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  
  //   try {
  //     const response = await axios.get(
  //       "http://localhost/rent-easy/auth/logout.php",
  //       {}, // Empty body for the POST request
  //       { withCredentials: true } // Include credentials if cookies are used
  //     );
  //     console.log(response.data);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate("/login");
  //     } 
  //     // else {
  //     //   toast.error(response.data.message || "Logout failed!");
  //     // }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     toast.error(
  //       error.response?.data?.message || error.message || "An error occurred!"
  //     );
  //   }
  // };

const onClick = () => {

    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
}
  return (
    <div>
      <p onClick={onClick}>Logout</p>
      
    </div>
  );
};

export default Logout;
