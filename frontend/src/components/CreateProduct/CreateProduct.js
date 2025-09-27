import React, { useEffect, useState } from 'react';
import AddAttribute from './AddAttribute/AddAttribute';
import AddImages from './AddImages/AddImages';
import AddPolicy from './AddPolicy/AddPolicy';
import Input from '../Forms/Input/Input';
import TextArea from '../Forms/TextArea/TextArea';
import SelectCity2 from '../Forms/Select/SelectCity2';
import SelectCategory from '../Forms/Select/SelectCategory';
//import SelectAttribute from './SelectAttribute/SelectAttribute';
import style from './CreateProduct.module.css';
import baseUrl from '../../utils/baseUrl.json';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { uploadImageToS3 } from '../../utils/s3Upload';

const CreateProduct = () => {
  /* Estados de arrays base de datos */
  const [arrayDataCategories, setArrayDataCategories] = useState([]);
  const [arrayDataCities, setArrayDataCities] = useState([]);
  const [arrayDataAttributes, setArrayDataAttributes] = useState([]);

  /* Estados del nuevo producto */
  const [propertyName, setPropertyName] = useState({ value: '', valid: null });
  const [category, setCategory] = useState([]);
  const [address, setAddress] = useState({ value: '', valid: null });
  const [city, setCity] = useState([]);
  const [description, setDescription] = useState('');
  const [arrayImages, setArrayImages] = useState([]);
  const [arrayAttributes, setArrayAttributes] = useState([]);
  const [sitePolicy, setSitePolicy] = useState(null);
  const [healthAndSafetyPolicy, setHealtAndSafetyPolicy] = useState(null);
  const [cancellationPolicy, setCancellationPolicy] = useState(null);
  const [msgErrorImages, setMsgErrorImages] = useState(false);

  //console.log(arrayImages);

  /* Nuevo producto creado */
  // const [newProductId, setNewProductId] = useState(null);

  const navigate = useNavigate();

  //console.log('newProductId', newProductId);
  //console.log('propertyName', propertyName);
  //console.log('city', city);
  //console.log('cityId', city?.id);
  //console.log('categoryId', category?.id);
  //console.log('category', category);
  //console.log('description', description);

  //console.log(sitePolicy);
  //console.log(healthAndSafetyPolicy);
  //console.log(cancellationPolicy);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (arrayImages.length < 5) {
      setMsgErrorImages(true);
      return;
    }


    // Subir imágenes a S3 y obtener URLs
    let uploadedImageUrls = [];
    try {
      uploadedImageUrls = await Promise.all(
        arrayImages.map(async (image, idx) => {
          let fileToUpload = null;
          if (image?.file) {
            fileToUpload = image.file;
          } else if (image?.value instanceof File) {
            fileToUpload = image.value;
          }
          console.log(`Imagen #${idx + 1}:`, fileToUpload);
          if (fileToUpload) {
            if (!(fileToUpload instanceof File)) {
              throw new Error(`La imagen #${idx + 1} no es un objeto File. Tipo: ${typeof fileToUpload}`);
            }
            const url = await uploadImageToS3(fileToUpload, category?.title || 'otros');
            return url;
          } else if (typeof image?.value === 'string' && image.value.startsWith('http')) {
            // Si ya es una URL, no subir a S3
            return image.value;
          } else {
            throw new Error(`Formato de imagen no soportado en la imagen #${idx + 1}`);
          }
        })
      );
      // Mostrar las URLs de CloudFront para testeo
      console.log('CloudFront image URLs:', uploadedImageUrls);
    } catch (err) {
      setMsgErrorImages(true);
      console.error('Error subiendo imágenes a S3:', err);
      return;
    }

    // Crea los atributos si es necesario
    await createNewAttribute();

    // Envía el producto con las URLs de las imágenes
    const dataProduct = await uploadProduct(uploadedImageUrls);
    const idProduct = dataProduct?.id;

    if (idProduct) {
      // Las imágenes ya están subidas, solo navega
      navigate('/successful-new-product');
    } else {
      console.log('El producto no fue creado');
    }
  };

  const getImages = (arrayImages) => {
    setArrayImages(arrayImages);
  };
  //console.log('arrayImages', arrayImages);

  const getAttributes = (arrayAttributes) => {
    setArrayAttributes(arrayAttributes);
  };

  /* Data categories*/
  useEffect(() => {
    fetch(`${baseUrl.url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setArrayDataCategories(data);
      });
  }, []);

  /* Data cities */
  useEffect(() => {
    fetch(`${baseUrl.url}/cities`)
      .then((res) => res.json())
      .then((data) => {
        setArrayDataCities(data);
      });
  }, []);

  /* Data attributes */
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    fetch(`${baseUrl.url}/attributes`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArrayDataAttributes(data);
      });
  }, []);

  // Ya no se necesita uploadImages, las imágenes se suben antes de crear el producto

  /* Modificar el nombre del ícono al guardarlo en la base de datos, de fa-wifi lo transformamos en faWifi */
  const modifySendIcon = (iconString) => {
    const replace1 = iconString.replace(/-/g, ' ').toLowerCase();
    const words = replace1.split(' ');

    for (let i = 1; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    const iconNewString = words.join('');

    //console.log(iconNewString);
    return iconNewString;
  };

  /* Creación de nuevos atributos en la base de datos si no existen */
  const createNewAttribute = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    //console.log('arrayAttributes1', arrayAttributes);

    const newAttributes = arrayAttributes?.map(async (attribute) => {
      //console.log(attribute);
      const attr = arrayDataAttributes.filter(
        (att) => att.icon === modifySendIcon(attribute.icon)
      );
      //console.log('attr', attr);
      if (attr.length === 0) {
        //console.log('Este atributo no existe, vamos a crearlo');
        await fetch(`${baseUrl.url}/attributes/create`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            name: attribute.name,
            icon: modifySendIcon(attribute.icon),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setArrayDataAttributes([...arrayDataAttributes, data]);
            //console.log('createNewAttribute: ', data);
          })
          .catch((err) => console.log('Error createNewAttribute: ', err));
      }
    });
    //console.log('newAttributs', newAttributes);
    return newAttributes;
  };

  /* Filtramos los atributos que se quieren subir con los existentes en la base de datos a través del nombre del ícono y luego retornamos el ID de cada uno como objetos de un array */
  const uploadAttributeById = () => {
    const attributesId = arrayAttributes?.map((attribute) => {
      const attr = arrayDataAttributes.filter(
        (att) => att.icon === modifySendIcon(attribute.icon)
      );
      if (attr.length !== 0) {
        return { id: attr[0].id };
      } else {
        return 0;
      }
    });

    //console.log('array attributes id', attributesId);
    return attributesId;
  };

  //console.log('Attr creados', arrayDataAttributes);

  /* Creación del nuevo producto, ahora recibe las URLs de las imágenes */
  const uploadProduct = async (imageUrls = []) => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const attributesId = uploadAttributeById();
    try {
      const response = await fetch(`${baseUrl.url}/products/create`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name: propertyName.value,
          description: description,
          short_description: 'prueba',
          active: false,
          address: address.value,
          latitude: '-37.9702777',
          longitude: '-57.5955626',
          area: '150',
          average_score: 5.0,
          city: {
            id: city?.id,
          },
          category: {
            id: category?.id,
          },
          policiesSite: sitePolicy,
          policiesSecurityAndHealth: healthAndSafetyPolicy,
          policiesCancellation: cancellationPolicy,
          attributes: attributesId,
          images: imageUrls.map((url, idx) => ({ title: `Image ${propertyName.value} ${idx + 1}`, url })),
        }),
      });
      const json = await response.json();
      console.log('Data new product', json);
      return json;
    } catch (err) {
      console.error('ERROR: Fallo al crear nuevo producto ', err);
    }
  };

  /* **************************** */

  return (
    <div className={style.container}>
      <h2>Crear propiedad</h2>
      <form className={style.formProduct} onSubmit={handleSubmit}>
        <section className={style.containerImages}>
          <h2>Cargar imágenes</h2>
          <AddImages getImages={getImages} category={category} />
          {msgErrorImages && (
            <div className={style.msgImageNewProductError}>
              <div>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </div>
              <p>Debe ingresar como mínimo 5 (cinco) imágenes</p>
            </div>
          )}
        </section>
        <section className={style.initialDataProperty}>
          <div className={style.doubleProperty}>
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
            />
          </div>
          <div className={style.doubleProperty}>
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
        <section className={style.containerAttributes}>
          <h2>Agregar atributos</h2>
          {/* <SelectAttribute /> */}
          <AddAttribute getAttributes={getAttributes} />
        </section>
        <section className={style.containerPolicies}>
          <h2>Políticas del producto</h2>
          <div className={style.subContainerPolicies}>
            <AddPolicy
              titlePolicy={'Normas del establecimiento'}
              getValuePolicy={setSitePolicy}
              name={'sitePolicy'}
            />
            <AddPolicy
              titlePolicy={'Salud y seguridad'}
              getValuePolicy={setHealtAndSafetyPolicy}
              name={'healthAndSafetyPolicy'}
            />
            <AddPolicy
              titlePolicy={'Política de cancelación'}
              getValuePolicy={setCancellationPolicy}
              name={'cancellationPolicy'}
            />
          </div>
        </section>
        <button className={`btn btn2 ${style.btnSubmit}`}>Crear</button>
      </form>
    </div>
  );
};

export default CreateProduct;
