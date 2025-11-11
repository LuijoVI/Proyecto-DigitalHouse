import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const Attributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/attributes")
      .then((res) => res.json())
      .then((data) => {
        setAttributes(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este atributo?")) {
      await fetch(`/attributes/${id}`, { method: "DELETE" });
      setAttributes(attributes.filter((a) => a.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestión de Atributos</h2>
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
            {attributes.map((attr) => (
              <tr key={attr.id}>
                <td>{attr.id}</td>
                <td>{attr.name}</td>
                <td>
                  <Link to={`edit/${attr.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(attr.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attributes;
