import { getServerSession } from "next-auth";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/User";
import { use } from "react";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ messageid: string }> }
) {
  // const resolvedParams = use(params); // Unwrap the Promise

  const parameter = await params;
  const messageId = parameter.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to delete message", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
