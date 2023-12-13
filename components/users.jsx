import React from "react";
import { Avatar } from "@nextui-org/react";

export default function Logusers({ user }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {user?.length > 0 ?(
        <p>Loading</p>
      ) : (
        user?.map((users) => (
          <div className="flex flex-col gap-2 bg-white shadow-lg rounded">
            <Avatar
              src={users.image}
              size="lg"
              className="h-[40px] w-[40px] rounded-full my-2"
            />
            <p className="text-sm text-black">{users.name}</p>
            <p className="text-gray-700 text-sm py-2">{users.email}</p>
          </div>
        ))
      )}
    </section>
  );
}
