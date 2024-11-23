import React, { useState } from "react";
import { Modal, Button, TextInput, PasswordInput } from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for toast notifications
import { useNavigate } from "react-router-dom";

const ForgetPasswordModal = ({ opened, close }) => {
  const navigate = useNavigate();

  // State variables for email, password, and confirmPassword
  const [email, setEmail] = useState("");
 

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form reload

    
    try {
      const response = await axios.post('http://localhost/rent-easy/auth/forgetPassword.php', { email });
       console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login"); // Redirect after success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Reset Password" centered>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        

        <Button fullWidth type="submit" mt="lg">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default ForgetPasswordModal;
