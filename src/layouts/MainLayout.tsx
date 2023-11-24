import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import ShoppingCartSideBar from "../components/Products/ShoppingCartSideBar";

export default function MainLayout() {

  return (
    <div>
      <Navbar />
      <ShoppingCartSideBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}