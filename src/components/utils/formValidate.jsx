import { useForm } from "@mantine/form";
export const useFormValidation = () => {
  // Mantine's useForm with validation rules
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      address: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
    },

    // Real-time validation rules
    validate: {
      fullName: (value) =>
        value?.trim() === "" ? "* Full name is required" : null,
      phoneNumber: (value) =>
        value && value.length < 10
          ? "* Phone must have at least 10 numbers"
          : null,
      address: (value) =>
        value?.trim() === "" ? "* Address is required" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "* Enter a valid email address",
      password: (value) =>
        value && value.length < 6
          ? "* Password must have at least 6 characters"
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "* Passwords do not match" : null,
    },
  });

  return form;
};
