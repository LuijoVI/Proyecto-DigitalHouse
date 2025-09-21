import React, { useEffect, useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as fas from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../../../utils/baseUrl.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../CreateProduct.module.css';
import Input from '../../Forms/Input/Input';

const AddAttribute = ({ getAttributes }) => {
  const [arrayGetAttributes, setArrayGetAttributes] = useState([]);
  const [arrayAttributes, setArrayAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [attributeName, setAttributeName] = useState({ value: '', valid: null });
  const [attributeIcon, setAttributeIcon] = useState({ value: '', valid: null });
  const [msgError, setMsgError] = useState(null);

  //console.log('attributeName', attributeName);
  //console.log('attributeIcon', attributeIcon);
  //console.log('arrayAttributes', arrayAttributes);


  useEffect(() => {
    // Obtener atributos predefinidos desde la API
    fetch(`${baseUrl.url}/attributes`)
      .then((res) => res.json())
      .then((data) => setArrayGetAttributes(data))
      .catch(() => setArrayGetAttributes([]));
  }, []);

  useEffect(() => {
    setMsgError(null);
  }, [attributeName.value, attributeIcon.value, selectedAttribute]);

  useEffect(() => {
    getAttributes(arrayAttributes);
  }, [arrayAttributes, getAttributes]);

  // const existAttribute = () => {
  //   arrayAttributes.filter(attribute => )
  // }

  const handleAddAttribute = () => {
    if (!showCustomInput) {
      if (!selectedAttribute) {
        setMsgError('Debes seleccionar un atributo de la lista.');
        return;
      }
      // Validar que no esté repetido
      if (arrayAttributes.some(attr => attr.name === selectedAttribute)) {
        setMsgError('Este atributo ya fue agregado.');
        return;
      }
      // Buscar el icono asociado
      const attrObj = arrayGetAttributes.find(attr => attr.name === selectedAttribute);
      setArrayAttributes([
        ...arrayAttributes,
        { name: attrObj.name, icon: attrObj.icon, valid: 'true' },
      ]);
      setSelectedAttribute('');
    } else {
      // Validar campos personalizados
      if (!attributeName.value || !attributeIcon.value) {
        setMsgError('Debes completar nombre e ícono.');
        return;
      }
      if (arrayAttributes.some(attr => attr.name === attributeName.value)) {
        setMsgError('Este atributo ya fue agregado.');
        return;
      }
      setArrayAttributes([
        ...arrayAttributes,
        { name: attributeName.value, icon: attributeIcon.value, valid: 'true' },
      ]);
      setAttributeName({ value: '', valid: null });
      setAttributeIcon({ value: '', valid: null });
      setShowCustomInput(false);
    }
  };

  const handleDeleteAttribute = (attributeValue) => {
    const newArrayAttributes = arrayAttributes.filter(
      (attr) => attr.name !== attributeValue
    );
    setArrayAttributes(newArrayAttributes);
    //console.log('individual attr delete', attributeValue);
    //console.log('arrayAttributesBeforeDeleteAttr', arrayAttributes);
  };

  /* Arreglar responsive -411px*/

  return (
    <>
      {arrayAttributes.map((attributeArray, i) => (
        <div className={style.containerDoubleInput} key={i}>
          <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
            <Input
              state={{ value: attributeArray.name }}
              label="Nombre"
              type="text"
              readonly
            />
            {/* Icono grande y sin nombre */}
            <span style={{fontSize: '38px', color: 'var(--primary-color)'}}>
              <FontAwesomeIcon icon={fas[attributeArray.icon]} />
            </span>
          </div>
          <button
            className={`${style.btn} ${style.btnDelete}`}
            onClick={() => handleDeleteAttribute(attributeArray.name)}
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
      {/* Drop list para atributos predefinidos */}
      {!showCustomInput && (
        <div className={style.containerDoubleInput} style={{flexDirection: 'column', alignItems: 'stretch', gap: '12px'}}>
          <div className={style.doubleInput}>
            <div style={{position: 'relative', width: '100%'}}>
              <select
                className={style.input}
                value={selectedAttribute}
                onChange={e => setSelectedAttribute(e.target.value)}
                style={{paddingLeft: '38px'}}
              >
                <option value="">Selecciona un atributo</option>
                {arrayGetAttributes.map(attr => (
                  <option key={attr.name} value={attr.name} data-icon={attr.icon}>
                    {attr.name}
                  </option>
                ))}
              </select>
              {/* Icono visual a la izquierda del select, si hay uno seleccionado */}
              {selectedAttribute && (
                <span style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#888'}}>
                  <FontAwesomeIcon icon={fas[arrayGetAttributes.find(attr => attr.name === selectedAttribute)?.icon]} />
                </span>
              )}
            </div>
            <button
              className={`${style.btn} ${style.btnPlus}`}
              onClick={handleAddAttribute}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {msgError && <p className={style.msgErrorInvalidForm}>{msgError}</p>}
          <button
            className={style.btn}
            type="button"
            onClick={() => setShowCustomInput(true)}
            style={{alignSelf: 'center', marginTop: '8px', minWidth: '260px', width: 'fit-content', padding: '0 18px'}}>
            ¿No encuentras el atributo? Agrégalo
          </button>
        </div>
      )}
      {/* Inputs personalizados para nuevo atributo */}
      {showCustomInput && (
        <div className={style.containerDoubleInput}>
          <div className={style.doubleInput}>
            <Input
              state={attributeName}
              changeState={setAttributeName}
              label="Nombre"
              type="text"
              placeholder="Wifi"
              error={msgError}
            />
            <Input
              state={attributeIcon}
              changeState={setAttributeIcon}
              label="Ícono"
              type="text"
              placeholder="fa-wifi"
              error={msgError}
            />
          </div>
          <button
            className={`${style.btn} ${style.btnPlus}`}
            onClick={handleAddAttribute}
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className={style.btn}
            type="button"
            onClick={() => setShowCustomInput(false)}
            style={{alignSelf: 'center', marginTop: '8px', minWidth: '260px', width: 'fit-content', padding: '0 18px'}}>
            Volver a la lista
          </button>
          {msgError && <p className={style.msgErrorInvalidForm}>{msgError}</p>}
        </div>
      )}
    </>

    // <div>
    //   {attributes.map((attribute) => (
    //     <div className={style.feature} key={attribute.id}>
    //       <FontAwesomeIcon icon={fas[attribute.icon]} />
    //       <p>{attribute.name}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default AddAttribute;
