import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const VerifyCodeQuerySchema = z.object({
  code: z.string().length(6),
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username); //optional
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isCodevalid = user.verifyCode == code;
    const isCodeNotExpired = new Date(user.verifyCodeExpires) > new Date();

    if (!isCodevalid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified",
        },
        { status: 500 }
      );
    } else if (!isCodevalid && !isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Code expired, please signup to get new code ",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        successs: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
