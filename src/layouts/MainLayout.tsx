import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}