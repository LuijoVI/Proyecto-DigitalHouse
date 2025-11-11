import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Products from "./Products";
import Categories from "./Categories";
import Attributes from "./Attributes";
import CreateProduct from "../../components/CreateProduct/CreateProduct";
import EditProduct from "./EditProduct";
import EditCategory from "./EditCategory";
import EditAttribute from "./EditAttribute";

const AdminDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route index element={<Products />} />
      <Route path="products" element={<Products />} />
      <Route path="products/edit/:id" element={<EditProduct />} />
      <Route path="categories" element={<Categories />} />
      <Route path="categories/edit/:id" element={<EditCategory />} />
      <Route path="attributes" element={<Attributes />} />
      <Route path="attributes/edit/:id" element={<EditAttribute />} />
      <Route path="create-product" element={<CreateProduct />} />
    </Route>
  </Routes>
);

export default AdminDashboardRoutes;
