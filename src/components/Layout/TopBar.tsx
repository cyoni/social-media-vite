import { useEffect } from "react";
import { useLogout } from "../../react-query/queries";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Avatar from "../Avatar";

function TopBar() {
  const { mutate: logout, isSuccess } = useLogout();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // refresh page
    }
  }, [isSuccess]);

  return (
    <div className="sticky top-0 z-20 sm:hidden p-3 bg-dark-2 w-full ">
      <div className="flex justify-between items-center">
        <div>Header</div>
        <div className="flex gap-3 items-center">
          <Button variant={"ghost"} onClick={() => logout()}>
            <img src={"/assets/icons/logout.svg"} alt="logout" />
          </Button>

          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
