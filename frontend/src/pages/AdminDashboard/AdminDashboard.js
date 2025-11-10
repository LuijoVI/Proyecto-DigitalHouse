import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1>Panel de Administración</h1>
      <nav className={styles.dashboardNav}>
        <Link to="products">Productos</Link>
        <Link to="categories">Categorías</Link>
        <Link to="attributes">Atributos</Link>
        <Link to="create-product">Crear Producto</Link>
      </nav>
      <div className={styles.dashboardContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
