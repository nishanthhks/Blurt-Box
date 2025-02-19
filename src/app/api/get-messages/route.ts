import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  // what below do  ->  user._id is a string, but mongoose.Types.ObjectId expects a string
  if (!user || !user._id) {
    return Response.json(
      { success: false, message: "User ID is missing" },
      { status: 400 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  // console.log("userId", userId);

  try {
    // unwind and sort by message creation
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    // console.log("userMessages", userMessages);
    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User n0ot found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        messages: userMessages[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("an unexpected error", error);
    return Response.json(
      {
        success: false,
        message: "an unexpected error",
      },
      {
        status: 500,
      }
    );
  }
}
