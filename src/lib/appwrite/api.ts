import { ID, Query } from "appwrite";
import { INewPost, INewUser, IUploadPost } from "../../types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser) {
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  );

  if (!newAccount) throw Error;

  const avatarUrl = avatars.getInitials(user.name);

  const newUser = await saveUserToDB({
    accountId: newAccount.$id,
    name: newAccount.name,
    email: newAccount.email,
    username: user.username,
    imageUrl: avatarUrl,
  });

  return newUser;
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function logIn(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function logOut() {
  return await account.deleteSessions();
}

export async function getFilePreview(bucketId: string, fileId: string) {
  try {
    const file = await storage.getFilePreview(bucketId, fileId);
    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(bucketId: string, fileId: string) {
  try {
    await storage.deleteFile(bucketId, fileId);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function uploadPost(post: IUploadPost) {
  try {
    const uploadedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      post
    );

    return uploadedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(form: INewPost) {
  const file = form.file[0];

  const uploadedFile = await uploadFile(file);

  if (!uploadedFile) {
    return false;
  }

  const preview = await getFilePreview(uploadedFile.bucketId, uploadedFile.$id);

  if (!preview) {
    await deleteFile(uploadedFile.bucketId, uploadedFile.$id);
    return false;
  }

  const post = {
    creator: form.userId,
    caption: form.caption,
    imageUrl: preview.href,
    imageId: uploadedFile.$id,
    location: form.location,
    tags: form.tags?.replaceAll(" ", "").split(",") || [],
  };

  const uploadedPost = await uploadPost(post);

  if (!uploadedPost) {
    await deleteFile(uploadedFile.bucketId, uploadedFile.$id);
    return false;
  }

  return true;
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  return posts;
}

export async function likePost(postId: string, likes: string[]) {
  const post = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    postId,
    { likes }
  );

  return post;
}

export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(3)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
};
