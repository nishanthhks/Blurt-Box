import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { updatedUsername, password } = await request.json();
  console.log(updatedUsername, password);
  try {
    const existingUser = await UserModel.findById(user._id);
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify the current password
    if (!password) {
      return Response.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return Response.json(
        { success: false, message: "Invalid password" },
        { status: 403 }
      );
    }

    const updateData: any = { username: updatedUsername };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $set: updateData,
      },
      { new: true }
    ); // Return the updated user

    return Response.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update profile", error);
    return Response.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
