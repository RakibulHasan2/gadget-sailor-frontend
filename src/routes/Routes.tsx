import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";
import Home from './../pages/Home/Home';
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MainLayout from "../layouts/MainLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import SingleProductPage from "../pages/Products/SingleProductPage";

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
        path: "/:id",
        element: <SingleProductPage/>,
        loader: ({ params }) => fetch(`${baseUrl}/allProducts/${params.id}`)
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
  }
]);

export default routes;