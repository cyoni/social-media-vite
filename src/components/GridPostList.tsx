import React from "react";
import PostStats from "./PostStats";
import { Link } from "react-router-dom";

function GridPostList({ posts }) {
  return (
    <ul className="mx-auto w-full grid  grid-cols-auto-fit-100 gap-5 sm:gap-8">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="absolute bottom-0 p-5 flex-between w-full bg-gradient-to-t from-dark-3 to-transparent  space-y-2">
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
                src={
                  post.creator.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="line-clamp-1">{post.creator.name}</p>
            </div>

            <PostStats post={post} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GridPostList;
