import { z } from "zod";

export const updateUsernameSchema = z.object({
  newUsername: z.string().min(3).max(20),
  password: z.string().min(6),
});
