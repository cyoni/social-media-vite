import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/AuthContext";
import { FaRegUser } from "react-icons/fa";

interface IProps {
  className?: string;
}

function Avatar({ className }: IProps) {
  const { user } = useCurrentUser();

  return (
    <Link to="/user/profile">
      {user?.imageUrl ? (
        <img
          src={user.imageUrl}
          className={`h-8 w-8 rounded-full ${className ? className : ""}`}
          alt="user"
        />
      ) : (
        <FaRegUser className={`h-5 w-5 ${className ? className : ""}`} />
      )}
    </Link>
  );
}

export default Avatar;
