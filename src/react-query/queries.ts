import { useMutation } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  logIn,
  logOut,
} from "../lib/appwrite/api";
import { INewPost, INewUser } from "../types";
import { useCurrentUser } from "../context/AuthContext";

export const useSignUpAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => logIn(user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logOut,
  });
};

export const useCreatPost = () => {
  return useMutation({
    mutationFn: (form: INewPost) => createPost(form),
  });
};
