import React, { useState } from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(""); // State to store the new password
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
      // Create FormData to send in the request
      const formData = new FormData();
      formData.append("email", "user@example.com"); // Replace with actual email
      formData.append("newPassword", newPassword);

      // Send request to API
      const response = await axios.post(
        "http://localhost/rent-easy/auth/resetPassword.php",
        formData
      );

      // Handle the response
      if (response.data.success) {
        toast.success("Password reset successful!");
        navigate("/login"); // Redirect to login page after success
      } else {
        toast.error(response.data.message); // Show error if any
      }
    } catch (error) {
      toast.error("An error occurred. Please try again!"); // Error handling
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            
            // onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        
          <Button fullWidth type="submit">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
