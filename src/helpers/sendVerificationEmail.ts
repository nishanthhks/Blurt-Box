import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "BLURT BOX verification code",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });

    return { success: true, message: "verification email sent succesfully" };
  } catch (error) {
    console.error("error sending verification email", error);
    return { success: false, message: "Error sending verification email" };
  }
}
