import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from '../../components/CreateProduct/CreateProduct.module.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data || data);
        setLoading(false);
      })
      .catch(() => setError("No se pudo cargar la categoría"));
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/categories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    navigate("/admin/categories");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!category) return null;

  return (
    <div className={styles.container}>
      <h2>Editar Categoría</h2>
      <form className={styles.formProduct} onSubmit={handleSubmit}>
        <label className={styles.labelForm}>Nombre:
          <input className={styles.inputForm} name="name" value={category.name || ""} onChange={handleChange} required />
        </label>
        {/* Agrega más campos si es necesario */}
        <button className={`btn btn2 ${styles.btnSubmit}`}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditCategory;
