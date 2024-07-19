import { Outlet } from "react-router-dom";
import TopBar from "../components/Layout/TopBar";
import LeftSidebar from "../components/Layout/LeftSidebar";
import BottomBar from "../components/Layout/BottomBar";

function RootLayout() {
  return (
    <div className="w-full flex flex-col sm:flex-row">
      <TopBar />

      <LeftSidebar />

      <section className="flex flex-1">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
}

export default RootLayout;
