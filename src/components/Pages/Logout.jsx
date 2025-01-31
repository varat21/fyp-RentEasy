import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

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
