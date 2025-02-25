import { z } from "zod";

export const updateUsernameSchema = z.object({
  updatedUsername: z.string().min(3).max(20),
  password: z.string(),
});
