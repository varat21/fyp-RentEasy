// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const GoogleLoginButton = ({ onSuccess = () => {} }) => {
//   const navigate = useNavigate();
//   const API_URL = "http://localhost/rent-easy/auth/google-auth.php";
  
//   // Log the API URL to verify it's correct
//   console.log("API Endpoint:", API_URL);

//   const handleLoginSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse?.credential;
//       if (!token) {
//         throw new Error("No token received from Google");
//       }

//       // Log the Google token for debugging
//       console.log("Google ID Token:", token);

//       // Decode the token to get user info
//       const decoded = jwtDecode(token);
//       console.log("Decoded Google User Info:", decoded);

//       // Log before making the API call
//       console.log("Sending request to:", API_URL);
      
//       // Send to backend for verification
//       const response = await axios.post(API_URL, { 
//         credential: token 
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       // Log the full response
//       console.log("Backend Response:", response.data);

//       if (response.data.success) {
//         // Store the JWT from your backend
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
        
//         console.log("User data stored in localStorage");
        
//         //  redirect
//         onSuccess(response.data);
//         navigate("/");
//       } else {
//         throw new Error(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login Error Details:", {
//         message: error.message,
//         response: error.response?.data,
//         stack: error.stack
//       });
//       alert(error.message || "Failed to login with Google");
//     }
//   };

//   const handleLoginFailure = () => {
//     console.error("Google Login Failed - User canceled or error occurred");
//     alert("Google login failed. Please try again.");
//   };

//   return (
//     <div style={{ 
//       width: "100%", 
//       display: "flex", 
//       justifyContent: "center",
//       padding: "20px 0"
//     }}>
//       <GoogleLogin 
//         onSuccess={handleLoginSuccess}
//         onError={handleLoginFailure}
//         // useOneTap
//         // auto_select
//         text="continue_with"
//         // shape="pill"
//         theme="filled_gray"
//         size="large"
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;


import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";

const GoogleLoginButton = ({ onSuccess = () => {} }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const API_URL = "http://localhost/rent-easy/auth/google-auth.php";

  console.log("API Endpoint:", API_URL);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) {
        throw new Error("No token received from Google");
      }

      console.log("Google ID Token:", token);

      console.log("Sending request to:", API_URL);

      const response = await axios.post(
        API_URL,
        { credential: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend Response:", response.data);

      if (response.data.success) {
        login(response.data.token, response.data.user); // Use context login
        console.log("User data stored and logged in");
        onSuccess(response.data);
        navigate("/"); // Navigate here after successful login
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error Details:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      alert(error.message || "Failed to login with Google");
    }
  };

  const handleLoginFailure = () => {
    console.error("Google Login Failed - User canceled or error occurred");
    toast.error("Google login failed. Please try again."); 
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        text="continue_with"
        theme="filled_gray"
        size="large"
      />
    </div>
  );
};

export default GoogleLoginButton;