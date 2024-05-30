import {z} from 'zod'

export const usernameValidation = z
  .string()
  .min(6, "Username must be at least 6 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(
    /^[a-z][a-z0-9_.-]*$/,
    "Username must start with a lowercase letter and can only contain lowercase letters, numbers, underscores, dots, and hyphens"
  );

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
   export const signUpSchemaValidation=z.object({
    username:usernameValidation,
    email:emailValidation,
    password:passwordValidation
   })
