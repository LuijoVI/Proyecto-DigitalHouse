import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      await fetch(`/categories/${id}`, { method: "DELETE" });
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestión de Categorías</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.dashboardTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <Link to={`edit/${cat.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
