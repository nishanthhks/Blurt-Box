import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]*$/,
    "Username can only contain letters, numbers, and underscores"
  );

const emailValidation = z.string().email({ message: "Invalid email address" });

const passwordValidation = z
  .string()
  .min(2, "Password must be at least 2 characters long");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
