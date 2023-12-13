import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Connect to the DB
    await connectToDB();
    //get the users using the model
    const users = await User.find();
    return NextResponse.json(
      {
        message: "Ok",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Users",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
