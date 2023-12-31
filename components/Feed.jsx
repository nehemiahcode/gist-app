"use client";

import { useState, useEffect } from "react";
import { Skeleton, Card } from "@nextui-org/react";
import PromptCard from "./PromptCard";
import { MdSearch } from "react-icons/md";

// const NoResultsMessage = ({ value }) => (
//   <div
//     className=" w-[90%] md:max-w-lg shadow-xl overflow-x-auto scrollbar-hide px-2  bg-white p-4 text-center"
//     radius="lg"
//   >
//     No results for <strong className="text-red-500">{value}</strong>
//   </div>
// );

const PromptCardList = ({ data, loading, handleTagClick }) => {
  return (
    <div className="mt-16 ">
      {data.length === 0 ? (
        <div className="flex flex-col md:flex-row w-full  gap-4">
          <Card className="md:w-[360px] w-full  space-y-5 p-4" radius="lg">
            <div className="min-w-[300px] w-full flex items-center gap-3">
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
          <Card className="md:w-[360px] w-full  space-y-5 p-4" radius="lg">
            <div className="min-w-[300px] w-full flex items-center gap-3">
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
          <Card className="md:w-[360px]  w-full space-y-5 p-4" radius="lg">
            <div className="min-w-[300px] w-full flex items-center gap-3">
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
        <div className="prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      // setLoading(true);
      const response = await fetch("/api/prompt", {next: { revalidate: 10, cache: "no-store" }});
      const data = await response.json();

      setAllPosts(data);
      // setLoading(false); // Set loading to false after posts are fetched
    } catch (error) {
      console.error("Error fetching posts:", error);
      // setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPost = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.post) ||
        regex.test(item.createdAt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPost(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPost(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer pl-9"
        />
        <span className=" absolute top-3 left-2">
          <MdSearch size={23} />
        </span>
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
