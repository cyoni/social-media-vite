import { Link } from "react-router-dom";
import { IPost } from "../types";
import moment from "moment";
import { useCurrentUser } from "../context/AuthContext";
import PostStats from "./PostStats";

interface IProps {
  post: IPost;
}

function PostCard({ post }: IProps) {
  console.log({ post });
  const { user } = useCurrentUser();

  return (
    <article className="relative bg-dark-2 rounded-2xl p-6 w-full border border-dark-4 lg:p-8">
      <div className="flex items-center gap-2">
        <div className="flex between gap-2">
          <Link to={`profile/${post.creator?.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-10 h-10 object-cover rounded-full"
            />
          </Link>

          <div className="text-light-1 flex-1">
            <p className="font-bold">{post.creator?.name}</p>
            <div className="flex gap-2 text-light-3 text-sm">
              <p>{moment(post.$createdAt).fromNow()}</p>•<p>{post.location}</p>
            </div>
          </div>

          <Link
            to={`/update-post/${post.$id}`}
            className={`absolute top-10 right-10 ${
              user.id !== post.creator.$id && "hidden"
            }`}
          >
            <img
              src={"/assets/icons/edit.svg"}
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-sm lg:text-md py-5">
          <p className="leading-[140%] mt-2">{post.caption}</p>
          <ul className="font-sm text-light-3 leading-[140%] flex gap-1">
            {post.tags.map((tag, index) => (
              <li key={index} className="text-light-3 text-sm">
                #{tag}
              </li>
            ))}
          </ul>

          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="post-picture"
            className="mt-5 w-full h-64 xs:h-[400px] lg:h-[450px] rounded-md object-cover mb-5"
          />
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </article>
  );
}

export default PostCard;
