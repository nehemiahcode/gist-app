import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const post = await Post.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch post created by user", {
      status: 500,
    });
  }
};
