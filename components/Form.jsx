"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination and thoughts run wild. 
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Prompt
          </span>

          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder="Write your post here"
            required
            maxLength={200}
            minLength={20}
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            maxLength={20}
            minLength={2}
            className="form_input"
          />
        </label>
        <input
          value={post.createdAt}
          onChange={(e) => setPost({ ...post, createdAt: e.target.value })}
          required
          disabled={type === "Create" || type === "Edit"}
          className="hidden"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <Button
            type="submit"
            isLoading={submitting}
            className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting
              ? type === "Create"
                ? "Creating..."
                : "Editing..."
              : type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
