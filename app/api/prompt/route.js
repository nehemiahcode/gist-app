import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const post = await Post.find({})
      .populate("creator")
      .sort({ createdAt: -1 })
      .limit(100);

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all post", { status: 500 });
  }
};
