import { z } from "zod";


export const emailValidation = z
  .string()
  .regex(
    /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
    "Invalid email address"
  );

export const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(12, "Password must be no more than 12 characters long")
  .regex(
    /^(?=.*[a-z])/i,
    "Password must contain at least one lowercase letter"
  );
export const loginSchemaValidation = z.object({
  
  email: emailValidation,
  password: passwordValidation,
});
