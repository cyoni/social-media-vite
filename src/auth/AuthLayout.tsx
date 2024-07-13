import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to={"/"} />
      ) : (
        <div className="flex w-full">
          <section className="flex flex-1">
            <Outlet />
          </section>

          <img src="/assets/images/side-img.svg" className="hidden md:block w-1/2 h-screen object-cover" />
        </div>
      )}
    </>
  );
}

export default AuthLayout;
