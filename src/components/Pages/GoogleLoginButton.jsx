import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ onSuccess = () => {} }) => {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    


    const token = credentialResponse?.credential;
    if (token) {
      console.log("JWT token:", token);
      localStorage.setItem("token", token);
      onSuccess(token);
    } else {
      console.error("Google Login Failed: No token received");
    }
  
  const response = await axios.post(
    "",token 
  );
  };
  const handleLoginFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <div style={{ width: "100%" }}>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
    </div>
  );
};

export default GoogleLoginButton;
