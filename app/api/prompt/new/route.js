import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { userId, post, tag, createdAt } = await request.json();

  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      post,
      tag,
      createdAt,
    });

    await newPost.create();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
