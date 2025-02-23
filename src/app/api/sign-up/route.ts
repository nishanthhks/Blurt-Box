import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect(); // Connect to DB

  try {
    const { username, email, password, deleteUser } = await request.json();

    // Check if a verified username already exists
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    // Check if an unverified user exists with this username
    const existingUnverifiedUser = await UserModel.findOne({
      username,
      isVerified: false,
    });

    // Allow email owner to delete unverified user
    if (existingUnverifiedUser && existingUnverifiedUser.email === email) {
      if (deleteUser) {
        await UserModel.deleteOne({ username });
        return Response.json(
          {
            success: true,
            message: "Unverified user deleted successfully",
          },
          { status: 200 }
        );
      }
    }

    // Check if email already exists
    const existingUserByEmail = await UserModel.findOne({ email });

    // Generate verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date(Date.now() + 3600000); // 1-hour expiry

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          { status: 400 }
        );
      } else {
        // Update existing unverified user
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpires = expiryDate;
        existingUserByEmail.username = username;
        await existingUserByEmail.save();
      }
    } else {
      // Register a new user
      await UserModel.deleteOne({ username: username });
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpires: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      // Send verification email before saving user
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: "Error sending verification email",
          },
          { status: 500 }
        );
      }

      await newUser.save(); // Save user only if email is sent successfully
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
