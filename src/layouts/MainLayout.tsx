import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import CartIcon from "../components/Products/CartIcon";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <CartIcon></CartIcon>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}