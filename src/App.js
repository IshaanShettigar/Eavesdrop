import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


function App() {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
      {/* <Routes>
        <Route path="/" exact element={Tasks} />
        <Route path="/tasks" element={Tasks} />
        <Route path="/analytics" element={Analytics} />
        <Route path="/calendar" element={Calendar} />
      </Routes> */}
    </div>
  );
}



export default App;
