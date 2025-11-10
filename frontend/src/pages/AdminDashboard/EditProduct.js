

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
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const prod = data.data || data;
        setPropertyName({ value: prod.name || '', valid: true });
        setCategory(prod.category || null);
        setAddress({ value: prod.address || '', valid: true });
        setCity(prod.city || null);
        setDescription(prod.description || '');
        setArrayAttributes(prod.attributes || []);
        setSitePolicy(prod.policiesSite || '');
        setHealtAndSafetyPolicy(prod.policiesSecurityAndHealth || '');
        setCancellationPolicy(prod.policiesCancellation || '');
        // Recuperar y asignar otros campos relevantes si existen
        setShortDescription(prod.short_description || '');
        setActive(prod.active !== undefined ? prod.active : false);
        setLatitude(prod.latitude || '');
        setLongitude(prod.longitude || '');
        setArea(prod.area || '');
        setLoading(false);
      })
      .catch(() => setError('No se pudo cargar el producto'));
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
      id,
      name: propertyName.value,
      description,
      address: address.value,
      city,
      category,
      attributes: arrayAttributes,
      policiesSite: sitePolicy,
      policiesSecurityAndHealth: healthAndSafetyPolicy,
      policiesCancellation: cancellationPolicy,
    };
    await fetch(`/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    navigate('/admin/products');
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
              state={propertyName}
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
            />
          </div>
          <div className={styles.doubleProperty}>
            <Input
              state={address}
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
            />
          </div>
          <TextArea
            state={description}
            label={'Descripción'}
            changeState={setDescription}
            placeholder={'Escriba aquí'}
            name={'descriptionProperty'}
          />
        </section>
        {/* Sección de atributos */}
        <section className={styles.containerAttributes}>
          <h2>Agregar atributos</h2>
          <AddAttribute getAttributes={setArrayAttributes} value={arrayAttributes} />
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
            />
            <AddPolicy
              titlePolicy={'Salud y seguridad'}
              getValuePolicy={setHealtAndSafetyPolicy}
              name={'healthAndSafetyPolicy'}
              value={healthAndSafetyPolicy}
            />
            <AddPolicy
              titlePolicy={'Política de cancelación'}
              getValuePolicy={setCancellationPolicy}
              name={'cancellationPolicy'}
              value={cancellationPolicy}
            />
          </div>
        </section>
        <button className={`btn btn2 ${styles.btnSubmit}`}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
