import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from '../../components/CreateProduct/CreateProduct.module.css';

const EditAttribute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attribute, setAttribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/attributes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAttribute(data.data || data);
        setLoading(false);
      })
      .catch(() => setError("No se pudo cargar el atributo"));
  }, [id]);

  const handleChange = (e) => {
    setAttribute({ ...attribute, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/attributes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attribute),
    });
    navigate("/admin/attributes");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!attribute) return null;

  return (
    <div className={styles.container}>
      <h2>Editar Atributo</h2>
      <form className={styles.formProduct} onSubmit={handleSubmit}>
        <label className={styles.labelForm}>Nombre:
          <input className={styles.inputForm} name="name" value={attribute.name || ""} onChange={handleChange} required />
        </label>
        {/* Agrega más campos si es necesario */}
        <button className={`btn btn2 ${styles.btnSubmit}`}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditAttribute;
