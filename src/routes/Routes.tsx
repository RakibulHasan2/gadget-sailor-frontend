import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";
import Home from './../pages/Home/Home';
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MainLayout from "../layouts/MainLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import SingleProductPage from "../pages/Products/SingleProductPage";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import MyProfile from "../pages/MyProfile/MyProfile";

const baseUrl = "http://localhost:5000/api/v1";

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
        element: <SingleProductPage/>,
        loader: async ({ params }) =>await fetch(`${baseUrl}/allProducts/${params.id}`)
      }
    ],
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
    element: <AddProduct />,
  },
  {
    path: "/updateProduct",
    element: <UpdateProduct />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
]);

export default routes;