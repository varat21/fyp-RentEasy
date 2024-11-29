import React, { useState } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOTPModal = () => {
  const [otp, setOtp] = useState(""); // OTP entered by the user
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form reload
    
    try {
      const response = await axios.post("http://localhost/rent-easy/auth/verifyOtp.php", { email, otp });
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        navigate("/reset-password"); // Redirect to reset password page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="OTP"
          placeholder="Enter the OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button fullWidth type="submit" mt="lg">
          Verify OTP
        </Button>
      </form>
    </div>
  );
};

export default VerifyOTPModal;
