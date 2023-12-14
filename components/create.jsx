"use client";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { FaExpeditedssl } from "react-icons/fa6";

export default function CreateBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Button
          isIconOnly
          size="lg"
          as={NextLink}
          scroll={false}
          prefetch={false}
          href="/create-post"
          className={` ${
            (router === "/create-post" && "hidden") ||
            (router === "/" && "flex")
          } rounded-full  bg-orange-500 z-[990] text-white fixed bottom-24 right-10 `}
        >
          <AiOutlinePlus size={23} />
        </Button>
      ) : (
        <Button
          isIconOnly
          onPress={onOpen}
          size="lg"
          className={` ${
            (router === "/create-post" && "hidden") ||
            (router === "/" && "flex")
          } rounded-full  bg-orange-500 z-[990] text-white fixed bottom-24 right-10 `}
        >
          <AiOutlinePlus size={25} />
        </Button>
      )}
      <NotUserModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export function NotUserModal({ isOpen, onOpenChange }) {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=" rounded-none bg-white"
        size="xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="flex flex-col justify-center items-center py-5">
                <span className=" text-7xl">
                  <FaExpeditedssl />
                </span>
                <p className="text-center">
                  You must signin to create your own prompt
                </p>

                {session?.user ? null : (
                  <>
                    {providers &&
                      Object.values(providers).map((provider) => (
                        <Button
                          type="button"
                          key={provider.name}
                          onClick={() => {
                            signIn(provider.id);
                          }}
                          className=" w-full bg-orange-500 font-medium rounded-none text-white my-3"
                        >
                          Signin now
                        </Button>
                      ))}
                  </>
                )}
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
