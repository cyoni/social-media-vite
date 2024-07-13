import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../constants/general.consts";

function BottomBar() {
  const { pathname } = useLocation();
  return (
    <section className="sm:hidden flex w-full gap-5 justify-evenly p-2 rounded-t-[20px] bg-dark-2">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={`bottombar-${link.label}`}
            className={`flex flex-col gap-1 p-2 rounded-md items-center transition ${
              isActive && "bg-primary-600"
            }`}
          >
            <img
              src={link.imgURL}
              alt="icon"
              className={`w-5 h-5 ${isActive && "invert-white"}`}
            />
            <p className="text-xs">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default BottomBar;
