import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDB();

    const post = await Post.find({}).populate("creator");

    return NextResponse.json({ message: "Ok", post: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all post" },
      { status: 500 }
    );
  }
};
