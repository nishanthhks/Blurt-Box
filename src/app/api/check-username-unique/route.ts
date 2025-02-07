import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  //todo: use this in all other routs
  // not required in new nextJS api routes in newer versions
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Invalid method",
      },
      { status: 405 }
    );
  }
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParams);
    console.log(result); //todo : remove

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameter",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique ",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        successs: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
