import React from "react";
import { Modal, Button, TextInput, PasswordInput } from "@mantine/core";

const ForgetPasswordModal = ({ opened, close }) => {

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset submitted");
    close(); // Close modal after form submission
  };

  return (
    <Modal opened={opened} onClose={close} title="Reset Password" centered>
      <form onSubmit={handleSubmit}>
        <TextInput label="Email" placeholder="Enter email" required />
        <PasswordInput label="New Password" placeholder="Enter password" required />
        <PasswordInput label="Confirm Password" placeholder="Confirm password" required />
        <Button fullWidth type="submit" mt="lg">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default ForgetPasswordModal;
