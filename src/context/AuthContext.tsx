import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../lib/appwrite/api";
import { IUser } from "../types";
import { useNavigate } from "react-router-dom";

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("cookieFallback");
    if (!session || session === "[]") {
      navigate("/sign-in");
      return;
    }
    checkAuthUser();
  }, []);

  const checkAuthUser = async () => {
    setIsLoading(true);

    const currentUser = await getUser();

    setIsLoading(false);

    if (!currentUser) {
      return false;
    }

    setIsAuthenticated(true);

    setUser({
      id: currentUser.$id,
      name: currentUser.name,
      username: currentUser.username,
      email: currentUser.email,
      imageUrl: currentUser.imageUrl,
      bio: currentUser.bio,
    });

    return true;
  };

  const value: IContextType = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useCurrentUser = () => useContext(AuthContext);
