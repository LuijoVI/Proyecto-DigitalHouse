

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Forms/Input/Input';
import TextArea from '../../components/Forms/TextArea/TextArea';
import SelectCity2 from '../../components/Forms/Select/SelectCity2';
import SelectCategory from '../../components/Forms/Select/SelectCategory';
import AddAttribute from '../../components/CreateProduct/AddAttribute/AddAttribute';
import AddPolicy from '../../components/CreateProduct/AddPolicy/AddPolicy';
import styles from '../../components/CreateProduct/CreateProduct.module.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [arrayDataCategories, setArrayDataCategories] = useState([]);
  const [arrayDataCities, setArrayDataCities] = useState([]);
  const [arrayDataAttributes, setArrayDataAttributes] = useState([]);

  // Estados del producto editable
    const [propertyName, setPropertyName] = useState({ value: '', valid: null });
    const [category, setCategory] = useState(null);
    const [address, setAddress] = useState({ value: '', valid: null });
    const [city, setCity] = useState(null);
    const [description, setDescription] = useState('');
    const [arrayAttributes, setArrayAttributes] = useState([]);
    const [sitePolicy, setSitePolicy] = useState('');
    const [healthAndSafetyPolicy, setHealtAndSafetyPolicy] = useState('');
    const [cancellationPolicy, setCancellationPolicy] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shortDescription, setShortDescription] = useState('');
    const [active, setActive] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    console.log('[Edición Producto] Iniciando recuperación de datos para producto con id:', id);
    fetch(`/products/${id}`)
      .then((res) => {
        console.log('[Edición Producto] Respuesta recibida del backend:', res.status);
        return res.json();
      })
      .then((data) => {
        const prod = data.data || data;
        console.log('[Edición Producto] Datos del producto recuperados:', prod);
        setPropertyName({ value: prod.name || '', valid: true });
        setCategory(prod.category || null);
        setAddress({ value: prod.address || '', valid: true });
        setCity(prod.city || null);
        setDescription(prod.description || '');
        setArrayAttributes(prod.attributes || []);
        setSitePolicy(prod.policiesSite || '');
        setHealtAndSafetyPolicy(prod.policiesSecurityAndHealth || '');
        setCancellationPolicy(prod.policiesCancellation || '');
        setShortDescription(prod.short_description || '');
        setActive(prod.active !== undefined ? prod.active : false);
  setLatitude(prod.latitude || '');
  setLongitude(prod.longitude || '');
        setArea(prod.area || '');
        setLoading(false);
        console.log('[Edición Producto] Estados inicializados correctamente');
        setLatitude(prod.latitude || '');
        setLongitude(prod.longitude || '');
      })
      .catch((err) => {
        console.error('[Edición Producto] Error al recuperar el producto:', err);
        setError('No se pudo cargar el producto');
      });
  }, [id]);

  useEffect(() => {
    fetch(`/categories`)
      .then((res) => res.json())
      .then((data) => setArrayDataCategories(data));
    fetch(`/cities`)
      .then((res) => res.json())
      .then((data) => setArrayDataCities(data));
    fetch(`/attributes`)
      .then((res) => res.json())
      .then((data) => setArrayDataAttributes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: propertyName.value,
      description,
      address: address.value,
      city,
      category,
      latitude,
      longitude,
      attributes: arrayAttributes,
      policiesSite: sitePolicy,
      policiesSecurityAndHealth: healthAndSafetyPolicy,
      policiesCancellation: cancellationPolicy,
    };
    console.log('[Edición Producto] Enviando datos al backend:', updatedProduct);
    try {
      const response = await fetch(`/products/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      console.log('[Edición Producto] Respuesta del backend al actualizar:', response.status);
      if (response.ok) {
        console.log('[Edición Producto] Producto actualizado correctamente');
        navigate('/admin/products');
      } else {
        console.error('[Edición Producto] Error al actualizar el producto:', response.status);
      }
    } catch (err) {
      console.error('[Edición Producto] Error en la petición de actualización:', err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Editar propiedad</h2>
      <form className={styles.formProduct} onSubmit={handleSubmit}>
        {/* Sección de datos iniciales */}
        <section className={styles.initialDataProperty}>
          <div className={styles.doubleProperty}>
            <Input
              state={{ ...propertyName, valid: propertyName.valid === true ? 'true' : propertyName.valid === false ? 'false' : propertyName.valid }}
              changeState={setPropertyName}
              label="Nombre de la propiedad"
              id="propertyName"
              name="propertyName"
              placeholder="Texto"
            />
            <SelectCategory
              arrayDataOptions={arrayDataCategories}
              placeholder={'Categoría'}
              label={'Categoría'}
              name={'propertyCategory'}
              isLocationIcon={false}
              isOptionTextInTwoLines={false}
              getValue={setCategory}
              value={category}
              selectedOption={category}
            />
          </div>
          <div className={styles.doubleProperty}>
            <Input
              state={{ value: latitude, valid: null }}
              changeState={val => setLatitude(val.value)}
              label="Latitud"
              id="latitude"
              name="latitude"
              placeholder="Ej: -37.9702777"
            />
            <Input
              state={{ value: longitude, valid: null }}
              changeState={val => setLongitude(val.value)}
              label="Longitud"
              id="longitude"
              name="longitude"
              placeholder="Ej: -57.5955626"
            />
          </div>
          <div className={styles.doubleProperty}>
            <Input
              state={{ ...address, valid: address.valid === true ? 'true' : address.valid === false ? 'false' : address.valid }}
              changeState={setAddress}
              label="Dirección"
              id="address"
              name="address"
              placeholder="Texto"
            />
            <SelectCity2
              arrayDataOptions={arrayDataCities}
              placeholder={'Ciudad'}
              label={'Ciudad'}
              name={'propertyCity'}
              isLocationIcon={false}
              isOptionTextInTwoLines={false}
              getValue={setCity}
              value={city}
              selectedOption={city}
            />
          </div>
          <TextArea
            state={{ value: description }}
            label={'Descripción'}
            changeState={val => setDescription(val.value)}
            placeholder={'Escriba aquí'}
            name={'descriptionProperty'}
            value={description}
            initialValue={description}
          />
        </section>
        {/* Sección de atributos */}
        <section className={styles.containerAttributes}>
          <h2>Agregar atributos</h2>
          <AddAttribute getAttributes={setArrayAttributes} value={arrayAttributes} initialAttributes={arrayAttributes} />
        </section>
        {/* Sección de políticas */}
        <section className={styles.containerPolicies}>
          <h2>Políticas del producto</h2>
          <div className={styles.subContainerPolicies}>
            <AddPolicy
              titlePolicy={'Normas del establecimiento'}
              getValuePolicy={setSitePolicy}
              name={'sitePolicy'}
              value={sitePolicy}
              initialValue={sitePolicy}
            />
            <AddPolicy
              titlePolicy={'Salud y seguridad'}
              getValuePolicy={setHealtAndSafetyPolicy}
              name={'healthAndSafetyPolicy'}
              value={healthAndSafetyPolicy}
              initialValue={healthAndSafetyPolicy}
            />
            <AddPolicy
              titlePolicy={'Política de cancelación'}
              getValuePolicy={setCancellationPolicy}
              name={'cancellationPolicy'}
              value={cancellationPolicy}
              initialValue={cancellationPolicy}
            />
          </div>
        </section>
        <button className={`btn btn2 ${styles.btnSubmit}`}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
