"use client";
// ProfilePage.jsx
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/edit-post?id=${post._id}`);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    onOpen(); // Open the NextUI modal
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`/api/prompt/${selectedPost._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter(
        (item) => item._id !== selectedPost._id
      );

      setPosts(filteredPosts);
      toast.success("post deleted");
      navigator.vibrate([60, 0]);
      setLoading(true);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      navigator.vibrate([30]);
    } finally {
      onOpenChange(); // Close the NextUI modal
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    onOpenChange(); // Close the NextUI modal
    setSelectedPost(null);
  };
  if (!session) {
    redirect('/')
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
      <Profile
        name={"My"}
        desc={`Hi ${session?.user?.name}, Welcome to your profile`}
        userImage={session?.user?.image}
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Delete Confirmation"
        content={
          `${session?.user?.name}, are you sure you want to delete this post?` +
          " " +
          "This action is Irreversible!."
        }
      />
    </>
  );
}

export function CustomModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  loading,
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose} // Close modal when backdrop is clicked
        className="rounded-none bg-white"
        size="xl"
        placement="center"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col">
              <h2 className="font-semibold text-lg py-2">{title}</h2>
              <p className=" py-2">{content}</p>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between items-center">
            <Button
              onClick={handleClose}
              className=" rounded text-black hover:bg-gray-500  border-slate-800 font-medium hover:text-white bg-white border"
            >
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={handleConfirm}
              className="bg-red-500 rounded font-medium text-white"
            >
              {loading ? "Deleting..." : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
