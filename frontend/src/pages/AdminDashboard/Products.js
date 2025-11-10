import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await fetch(`/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <Link to="/admin/create-product" className={styles.dashboardNav}>Crear Producto</Link>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.dashboardTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category?.name}</td>
                <td>
                  <Link to={`edit/${product.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
