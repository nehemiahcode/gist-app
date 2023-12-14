"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
    createdAt: new Date().toDateString(),
  });
  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newPost = {
        post: post.post,
        userId: session.user.id,
        tag: post.tag,
        createdAt: post.createdAt,
        id: Math.random().toString(36).substring(2, 15), // Generate temporary ID
        pending: true,
      };

      // Add the temporary post to allPosts state immediately
      setAllPosts((previousPosts) => [...previousPosts, newPost]);
      const res = await fetch(`/api/prompt/new`, {
        method: "POST",
        body: JSON.stringify({
          post: post.post,
          userId: session.user.id,
          tag: post.tag,
          createdAt: post.createdAt,
        }),
      });
      if (res.ok) {
        const actualPost = await res.json();
        setAllPosts((previousPosts) =>
          previousPosts.map((post) =>
            post.id === newPost.id ? actualPost : post
          )
        );
        toast.success("post created");
        navigator.vibrate([60, 30]);
      } else {
        // Remove temporary post if creation fails
        setAllPosts((previousPosts) =>
          previousPosts.filter((post) => post.id !== newPost.id)
        );
        toast.error("Opps something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Opps something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
              duration: 2000,
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <Form
        type={"Create"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </>
  );
}
