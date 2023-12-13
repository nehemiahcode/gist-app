"use client";
import { useEffect, useState } from "react";
import { User, Skeleton } from "@nextui-org/react";
import getUser from "@/components/getUser";
import { MdVerified } from "react-icons/md";
export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUser();
      setUsers(users);
    };

    fetchData();
  }, []);

  return (
    <section className=" w-full">
      <h1 className="head_text text-left py-4">
        <span className="blue_gradient">Users</span>
      </h1>

      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {users.length === 0 ? (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="flex gap-3 flex-col md:flex-row px-3">
            {users.map((user) => (
              <div
                className="flex flex-col gap-2 bg-white cursor-pointer py-3 px-10 shadow-lg rounded"
                key={user.id}
              >
                <User
                  size="lg"
                  name={
                    user._id === "657797498a85cc42fcf7ec5a" ? (
                      <p className="flex items-center gap-x-2">
                        <span>{user.username}</span>{" "}
                        <MdVerified color="orange" size={23} />
                      </p>
                    ) : (
                      user.username
                    )
                  }
                  description={user.email}
                  avatarProps={{
                    src: user.image,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
