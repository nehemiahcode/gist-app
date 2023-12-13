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
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          post: post.post,
          userId: session.user.id,
          tag: post.tag,
          createdAt: post.createdAt,
        }),
      });
      if (res.ok) {
        toast.success("post created");
        navigator.vibrate([60, 30]);
        setTimeout(() => {
          router.push("/");
        }, 3000);
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
