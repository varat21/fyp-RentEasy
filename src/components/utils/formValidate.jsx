import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormValidation = () => {
  const schema = z.object({
    name: z.string().min(1, "Full Name is required"),
    phoneNumber: z.string().min(10, "Phone Number is required").max(15, "Phone Number is too long"),
    userType: z.enum(["Landlord", "Tenant"]).refine(val => ["Landlord", "Tenant"].includes(val), {
      message: "User Type is required",
    }),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  

  return {
    resolver: zodResolver(schema),
  };
};
