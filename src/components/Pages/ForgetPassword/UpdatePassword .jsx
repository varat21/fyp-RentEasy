import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PasswordInput, Button } from "@mantine/core";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const resettoken = queryParams.get("resettoken");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("newPassword",newPassword);
    formData.append("resettoken",resettoken);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/rent-easy/auth/ForgetPassword/ResetPassword.php",
   formData,
   {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  }
);

      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button fullWidth type="submit" mt="lg" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';
// import { TextInput, Button, PasswordInput } from "@mantine/core";


// const ResetPassword = () => {
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

//   // Get email and from the URL query string
//   const queryParams = new URLSearchParams(window.location.search);
//   const email = queryParams.get('email');
//   const resettoken = queryParams.get('resettoken');

//   useEffect(() => {
//     if (email && resettoken) {
//       verifyEmail(email, resettoken);
//     } else {
//       setErrorMessage('Invalid verification link');
//     }
//   }, [email, resettoken]);

//   const verifyEmail = async (email, resettoken) => {
//     try {
//       setLoading(true);

//       // Make API call to the backend
//       const response = await axios.get(
// `http://localhost/rent-easy/auth/ForgetPassword/updatePassword.php?email=${email}&resettoken=${resettoken}`,

//       );
//       console.log(response);

//       setLoading(false);
//       if (response.data.success) {
//         // Verification successful
//         toast.success(response.data.message);
//         // Redirect to login page after successful verification
        
//           // navigate('/login');
//         // ;
//       } else {
//         // Verification failed
//         // setErrorMessage(response.data.message);
//         // toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setErrorMessage('An error occurred. Please try again later.');
//       toast.error('An error occurred. Please try again later.');
//     }
//   };

//   return (



// <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
//     <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
//       <h2 className="text-2xl font-bold text-center text-gray-800">
//           Reset Password
//        </h2>
//         <form onSubmit={ResetPassword} className="space-y-4">
//           <PasswordInput
//              label="New Password"
//             placeholder="Enter your new password"
            
//              // onChange={(e) => setNewPassword(e.target.value)}
//              required
//           />
        
//           <Button fullWidth type="submit">
//             Reset Password
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

//  export default ResetPassword;


