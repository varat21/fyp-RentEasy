import React from "react";
import { Modal, Button, TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

// Zod validation schema
const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .nonempty("Phone number is required"),
  password: z.string().nonempty("Password is required"),
});

const ProfileEditModal = ({ opened, close }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost/rent-easy/auth/update-profile.php",
        data
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        close();
      } else {
        setError("root", {
          type: "manual",
          message: response.data.message || "Failed to update profile",
        });
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setError("root", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Profile" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          defaultValue="Cait Genevieve"
          {...register("name")}
          className="mb-4"
          error={errors.name?.message}
        />
        <TextInput
          label="Address"
          placeholder="Enter your address"
          defaultValue="New York, NY"
          {...register("address")}
          className="mb-4"
          error={errors.address?.message}
        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          defaultValue="9847502403"
          {...register("phone")}
          className="mb-4"
          error={errors.phone?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          className="mb-4"
          error={errors.password?.message}
        />
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" color="gray" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader size="xs" /> : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
