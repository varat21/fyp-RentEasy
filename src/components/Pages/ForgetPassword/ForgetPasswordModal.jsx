import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Notification,
  Loader,
  PasswordInput,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ForgetPasswordModal = ({ opened, onClose }) => {
  const [email, setEmail] = useState(""); // State for email
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const [otpModalOpen, setOtpModalOpen] = useState(false); // State for OTP modal
  const [resetModalOpen, setResetModalOpen] = useState(false); // State for reset password modal

  const navigate = useNavigate();

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("email", email);
  
    try {
      const response = await axios.post(
        "http://localhost/rent-easy/auth/ForgetPassword/forgetPassword.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // This ensures the form data is sent correctly
          },
        }
      );
  
      if (response.data.success) {
        setMessage("Check your email and click the link!");
        setMessageType("success");
        toast.success("Check your email and click the link!!");
        setOtpModalOpen(true); // Open OTP modal
        onClose(); // Close the email modal
      } else {
        setMessage(response.data.message);
        setMessageType("error");
        toast.error(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setMessageType("error");
      toast.error("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  // // Handle OTP submission
  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost/rent-easy/auth/verifyOtp.php",
  //       { otp },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);

  //     if (response.data.success) {
  //       toast.success("OTP verified successfully!");
  //       setOtpModalOpen(false);
  //       setResetModalOpen(true); // Open reset password modal
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to verify OTP. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Handle reset password submission
  // const handleResetSubmit = async (e) => {
  //   e.preventDefault();
  //   if (newPassword !== confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost/rent-easy/auth/resetPassword.php",
  //       { email, newPassword },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       toast.success("Password reset successfully!");
  //       setResetModalOpen(false);
  //       navigate("/login"); // Redirect to login page
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to reset password. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* Email Input Modal */}
      <Modal opened={opened} onClose={onClose} title="Forgot Password" centered>
        <form onSubmit={handleEmailSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button fullWidth type="submit" mt="lg" disabled={loading}>
            {loading ? <Loader size="xs" /> : "Send"}
          </Button>
          {message && (
            <Notification
              color={messageType === "success" ? "green" : "red"}
              mt="md"
              withCloseButton
            >
              {message}
            </Notification>
          )}
        </form>
      </Modal>

      {/* OTP Input Modal */}
      {/* <Modal opened={otpModalOpen} onClose={() => setOtpModalOpen(false)} title="Enter OTP" centered>
        <form onSubmit={handleOtpSubmit}>
          <TextInput
            label="OTP"
            placeholder="Enter the OTP sent to your email"
            withAsterisk
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button fullWidth type="submit" mt="lg" disabled={loading}>
            {loading ? <Loader size="xs" /> : "Verify OTP"}
          </Button>
        </form>
      </Modal> */}

      {/* Reset Password Modal */}
      {/* <Modal opened={resetModalOpen} onClose={() => setResetModalOpen(false)} title="Reset Password" centered>
        <form onSubmit={handleResetSubmit}>
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            withAsterisk
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your new password"
            withAsterisk
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button fullWidth type="submit" mt="lg" disabled={loading}>
            {loading ? <Loader size="xs" /> : "Reset Password"}
          </Button>
        </form>
      </Modal> */}
    </>
  );
};

export default ForgetPasswordModal;
