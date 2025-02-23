import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  console.log("email", email);
  console.log("username", username);
  console.log("verifyCode", verifyCode);
  try {
    const response = await resend.emails.send({
      // from: "Acme <onboarding@resend.dev>",
      from: "blurtbox@nishanthks.me",
      to: email,
      subject: "BLURT BOX verification code",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });

    console.log("response", response);

    return { success: true, message: "verification email sent succesfully" };
  } catch (error) {
    console.error("error sending verification email", error);
    return { success: false, message: "Error sending verification email" };
  }
}
