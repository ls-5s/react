import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Demo from "../pages/Demo";
import Test from "../pages/Test";
import Products from "../pages/products/Products";
import ProductDetail from "../pages/products/ProductDetail";
import ProductCategory from "../pages/products/ProductCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 一级路由
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "demo/:ID",
        element: <Demo />,
      },
      {
        path: "test",
        element: <Test />,
      },
      // 产品中心 - 二级路由
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":category",
            element: <ProductCategory />,
          },
          {
            path: "detail/:id",
            element: <ProductDetail />,
          },
        ],
      },
      // 404 重定向
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
