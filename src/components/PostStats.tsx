import React, { useMemo } from "react";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../react-query/queries";
import { Models } from "appwrite";
import { useCurrentUser } from "../context/AuthContext";

function PostStats({ post }) {
  const { user } = useCurrentUser();
  const { id: userId } = user;

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavePost } = useDeleteSavePost();
  const { data: currentUser } = useGetCurrentUser();

  const postLikes = useMemo(() => {
    return post.likes.map((user: Models.Document) => user.$id);
  }, [post]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const isLike = !postLikes.includes(userId);

    const newLikes = isLike
      ? [...postLikes, userId]
      : postLikes.filter((id: string) => id !== userId);

    likePost({ postId: post.$id, likes: newLikes });
  };

  const saveDoc = useMemo(() => {
    return currentUser?.save.find(
      (record: Models.Document) => record.post.$id === post.$id
    );
  }, [currentUser]);

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (saveDoc) {
      deleteSavePost({ saveId: saveDoc.$id });
    } else {
      savePost({ userId, postId: post.$id });
    }
  };

  const checkIsLiked = postLikes.includes(userId);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <img
          src={`${
            checkIsLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="text-sm">{postLikes?.length || 0}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={saveDoc ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
}

export default PostStats;
