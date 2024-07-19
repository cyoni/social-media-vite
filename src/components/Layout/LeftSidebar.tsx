import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../constants/general.consts";
import { useCurrentUser } from "../../context/AuthContext";
import Avatar from "../Avatar";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { useLogout } from "../../react-query/queries";

function LeftSidebar() {
  const { user, isLoading, setIsAuthenticated, setUser } = useCurrentUser();
  const { pathname } = useLocation();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <nav className="hidden sticky top-0 justify-between w-[270px] h-screen sm:flex flex-col gap-2 px-6 py-10 bg-dark-2">
      <div className="flex flex-col gap-y-8">
        <Link to={"/"} className="text-3xl">
          Header
        </Link>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Avatar className={"h-12 w-12"} />
            <div>
              <p>{user?.name}</p>
              <p className="text-xs text-gray-400">@{user?.username}</p>
            </div>
          </div>
        )}

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`base-medium group hover:bg-primary-500 rounded-md  transition ${
                  isActive ? "bg-primary-500" : ""
                }`}
              >
                <Link
                  to={link.route}
                  className={`p-3 px-3 flex gap-4 items-center   `}
                >
                  <img
                    src={link.imgURL}
                    className={`group-hover:invert-white  ${
                      isActive ? "invert-white" : ""
                    }`}
                    width={16}
                    height={16}
                    alt="nav"
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant={"ghost"}
        onClick={handleSignOut}
        className="space-x-2 self-start "
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <span>Log Out</span>
      </Button>
    </nav>
  );
}

export default LeftSidebar;
