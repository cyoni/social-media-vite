import React from "react";
import { useGetRecentPosts } from "../../react-query/queries";
import Loader from "../../components/Loader";
import PostCard from "../../components/PostCard";

function Home() {
  const {
    data: posts,
    error: isPostsError,
    isPending: isPostsLoading,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="space-y-10 overflow-auto py-10 px-5  md:px-8 lg:p-14 flex-1 ">
        <div className="max-w-screen-sm w-full mx-auto space-y-6 md:space-y-9">
          <div className="text-xl lg:text-2xl font-bold">Home Feed</div>

          {isPostsLoading ? (
            <Loader />
          ) : (
            <ul className="w-full space-y-10">
              {posts?.documents.map((post) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
