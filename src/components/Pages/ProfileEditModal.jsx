import React,{useEffect, useState} from "react";
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
  phoneNumber: z.string().min(10, "Phone Number is required").max(15, "Phone Number is too long"),

});

const ProfileEditModal = ({ opened, close,id, name,address,phoneNumber,password,gender ,defaultValues}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    name,
    address,  
    phoneNumber,
    password,
    gender,

  });


  const [formValues, setFormValues] = useState({
    name: name,
    address: address,
    phoneNumber:phoneNumber ,
    password: password,
    gender: gender,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues({
        name: defaultValues.name || "",
        address: defaultValues.address || "",
        phone: defaultValues.phone || "",
        password: defaultValues.password || "",
      });
    }
  }, [defaultValues]);


  const handleInputChange =(e)=>{
  const{name,value} = e.target;
  setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value}))
 };

 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost/rent-easy/public/updateProfile.php",
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
    
    
  };
}

  return (
    <Modal opened={opened} onClose={close} title="Edit Profile" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          defaultValue={formValues.name}
          {...register("name")}
          className="mb-4"
          error={errors.name?.message}
          value={formValues.name}
          name="name"
          onChange={handleInputChange}

        />
        <TextInput
          label="Address"
          placeholder="Enter your address"
          {...register("address")}
          className="mb-4"
          error={errors.address?.message}
          value={formValues.address}
        name="address"
        onChange={handleInputChange}


        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
          className="mb-4"
          error={errors.phoneNumber?.message}
          value={formValues.phoneNumber}
          name="phoneNumber"
          onChange={handleInputChange}
          type="number"


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
}

export default ProfileEditModal;
