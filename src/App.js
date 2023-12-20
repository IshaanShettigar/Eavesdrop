import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
}



export { App }