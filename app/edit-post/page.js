"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const { data: session } = useSession();

  const [post, setPost] = useState({ post: "", tag: "", createdAt: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        post: data.post,
        tag: data.tag,
        createdAt: data.createdAt,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          post: post.post,
          tag: post.tag,
          createdAt: post.createdAt,
        }),
      });

      if (response.ok) {
        toast.success("post edited");
      }
    } catch (error) {
      console.log(error);
      toast.error("sorry you can't edit this post");
    } finally {
      setIsSubmitting(false);
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default UpdatePrompt;
