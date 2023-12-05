import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";
import Home from './../pages/Home/Home';
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MainLayout from "../layouts/MainLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import SingleProductPage from "../pages/Products/SingleProductPage";
import MyProfile from './../pages/MyProfile/MyProfile';
import PrivateRoute from "./PrivateRoute";
import HotOfferPage from './../pages/HotOfferPage/HotOfferPage';
import BuildPC from "../pages/BuildPC/BuildPC";
import BuildProductsChose from "../pages/BuildPC/BuildProductsChose";
import FavPage from "../pages/Favourites/FavPage";
import PaymentLayout from "../layouts/PaymentLayout";
import MyCart from "../pages/MyCart/MyCart";
import MyOrder from "../pages/MyOrder/MyOrder";
import OrderHistory from "../pages/MyOrder/OrderHistory";
import OrderDetails from "../pages/MyOrder/OrderDetails";
import SearchedProducts from "../pages/Products/SearchedProducts";




const baseUrl = "https://gadget-sailor-backend.onrender.com/api/v1";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/hot-offer",
        element: <HotOfferPage />,
      },
      {
        path: "/:categoryName",
        element: <Products />,
        loader: ({ params }) => fetch(`${baseUrl}/allProducts/${params.categoryName}`)
      },
      {
        path: "/:categoryName/:subCategoryName",
        element: <Products />,
        loader: ({ params }) => fetch(`${baseUrl}/allProducts/${params.categoryName}/${params.subCategoryName}`)
      },
      {
        path: "/:categoryName/:subCategoryName/:brandName",
        element: <Products />,
        loader: ({ params }) => fetch(`${baseUrl}/allProducts/${params.subCategoryName}/${params.brandName}`)
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
        loader: async ({ params }) => await fetch(`${baseUrl}/allProducts/${params.id}`)
      },

      {
        path: "/products/search",
        element: <SearchedProducts />,

      },
      {
        path: "/my-cart",
        element: <PrivateRoute><MyCart /></PrivateRoute>,
      },
      {
        path: "/fav-item",
        element: <PrivateRoute><FavPage /></PrivateRoute>,
      },
      {
        path: "/build-pc",
        element: <BuildPC />,
      },
      {
        path: "/chose-components/:components",
        element: <BuildProductsChose />,
        loader: async ({ params }) => await fetch(`${baseUrl}/allProducts/Components/${params.components}`)
      }
    ]
  },
  {
    path: "/payment",
    element: <PaymentLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/payment/myOrder/:u_id",
        element: <MyOrder />,
        loader: async ({ params }) => {
          const response = await fetch(`${baseUrl}/getCart/${params?.u_id}`)
          const data = await response.json();
          return data;
        }
      },
      {
        path: '/payment/orderHistory',
        element: <OrderHistory />
      },
      {
        path: '/payment/orderDetails/:_id',
        element: <OrderDetails />,
        loader: async ({ params }) => {
          const response = await fetch(`${baseUrl}/getPayment/${params?._id}`)
          const data = await response.json();
          console.log(data)
          console.log(params?._id)
          return data;
        }
      }

    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/addProduct",
    element: <PrivateRoute><AddProduct /></PrivateRoute>,
  },

  {
    path: "/my-profile",
    element: <MyProfile />,
  },


]);

export default routes;