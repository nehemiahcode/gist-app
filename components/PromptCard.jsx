"use client";
import { useState } from "react";
import { User, Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BiCopy } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
// import NextLink from "next/link";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card grid grid-cols-1">
      <div className="flex justify-between items-start gap-5">
        {session ? (
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <User
              size="lg"
              name={
                post.creator._id === "657797498a85cc42fcf7ec5a" ? (
                  <p className="flex items-center flex-row-reverse  gap-x-2">
                    <MdVerified color="orange" size={19} />{" "}
                    <span>{post.creator.username}</span>
                  </p>
                ) : (
                  post.creator.username
                )
              }
              description={post.creator.email}
              avatarProps={{
                src: [post.creator.image],
              }}
            />
          </div>
        ) : (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <User
              size="lg"
              name={
                post.creator._id === "657797498a85cc42fcf7ec5a" ? (
                  <p className="flex items-center flex-row-reverse  gap-x-2">
                    <MdVerified color="orange" size={19} />{" "}
                    <span>{post.creator.username}</span>
                  </p>
                ) : (
                  post.creator.username
                )
              }
              description={post.creator.email}
              avatarProps={{
                src: [post.creator.image],
              }}
            />
          </div>
        )}

        <div className="copy_btn">
          <Dropdown className=" rounded-none">
            <DropdownTrigger>
              <Button isIconOnly className="bg-white rounded-full">
                <SlOptionsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                onClick={handleCopy}
                startContent={
                  copied === post.post ? <BsCheck2All /> : <BiCopy />
                }
                className="flex text-black rounded-none"
                key="copy"
              >
                Copy
              </DropdownItem>

              {session?.user.id === post.creator._id &&
                pathName === "/profile" && (
                  <DropdownItem
                    onClick={handleEdit}
                    key="edit"
                    startContent={<CiEdit />}
                    className="flex text-black rounded-none"
                  >
                    Edit
                  </DropdownItem>
                )}
              {session?.user.id === post.creator._id &&
                pathName === "/profile" && (
                  <DropdownItem
                    onClick={handleDelete}
                    key="delete"
                    startContent={<MdDelete />}
                    className="flex text-white bg-red-500 rounded-none"
                  >
                    Delete
                  </DropdownItem>
                )}
              {/* <DropdownItem
                className="flex text-black rounded-none"
                as={NextLink}
                href={`/posts/${post._id}`}
              >
                share
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <p className="my-4  font-poppins text-[0.9rem]  text-gray-700">
        {post.post}
      </p>
      <div className="flex gap-x-3 items-center">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <p className="text-gray-700 text-[0.8rem]">{post.createdAt}</p>
      </div>
    </div>
  );
};

export default PromptCard;
