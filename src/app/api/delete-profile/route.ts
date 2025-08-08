import UserModel from "@/models/User";  
import dbConnect from "@/lib/dbConnect";  
import { User } from "next-auth";  
import { getServerSession } from "next-auth";  
import { authOptions } from "../auth/[...nextauth]/options";  
  
export async function DELETE(request: Request) {  
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
    const deletedUser = await UserModel.findByIdAndDelete(user._id);  
      
    if (!deletedUser) {  
      return Response.json(  
        { success: false, message: "User not found" },  
        { status: 404 }  
      );  
    }  
  
    return Response.json(  
      { success: true, message: "Account deleted successfully" },  
      { status: 200 }  
    );  
  } catch (error) {  
    console.error("Failed to delete account", error);  
    return Response.json(  
      { success: false, message: "Failed to delete account" },  
      { status: 500 }  
    );  
  }  
}