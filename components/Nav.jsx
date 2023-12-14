"use client";

import Link from "next/link";
import { Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import NextLink from "next/link";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between w-full bg-white  mb-9 py-3 px-3 sm:px-16">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Gists</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Button
                as={NextLink}
                scroll={false}
                prefetch={false}
                href="/create-post"
                className="black_btn"
              >
                Create Post
              </Button>

              <Button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </Button>

              <Link scroll={false} prefetch={false} href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile picture"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </Button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    scroll={false}
                    prefetch={false}
                    href="/users"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Users
                  </Link>
                  <Link
                    scroll={false}
                    prefetch={false}
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    scroll={false}
                    prefetch={false}
                    href="/create-post"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Post
                  </Link>

                  <Button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full outline_btn"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </Button>
                ))}
            </>
          )}
        </div>
      </nav>
      {toggleDropdown && (
        <div
          onClick={() => {
            setToggleDropdown(false);
            console.log("clicked me");
          }}
          className="fixed h-screen w-full z-30 bg-[rgba(0,0,0,0.2)] bottom-0  top-0 "
        ></div>
      )}
    </>
  );
};

export default Nav;
