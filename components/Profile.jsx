import PromptCard from "./PromptCard";
import { Avatar, Skeleton, Card } from "@nextui-org/react";
const Profile = ({ name, desc, data, userImage, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <Avatar
        size="lg"
        src={userImage}
        className=" h-[100px] w-[100px]"
        alt={`${userImage} profile_picture`}
      />
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.length === 0 ? (
          <div className=" flex flex-col md:flex-row flex-wrap gap-4">
            <Card className="md:w-[360px] w-full space-y-5 p-4" radius="lg">
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-full h-3 rounded-lg" />
              </div>
            </Card>
            <Card className="md:w-[360px] w-full space-y-5 p-4" radius="lg">
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-full h-3 rounded-lg" />
              </div>
            </Card>
            <Card className="md:w-[360px] w-full space-y-5 p-4" radius="lg">
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-full h-3 rounded-lg" />
              </div>
            </Card>
          </div>
        ) : (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Profile;
