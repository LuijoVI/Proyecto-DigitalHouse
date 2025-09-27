
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from '../CreateProduct.module.css';

const AddImages = ({ getImages }) => {
  const [arrayImages, setArrayImages] = useState([]);
  const [msgError, setMsgError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    getImages(arrayImages);
  }, [arrayImages, getImages]);

  // Simulación de subida a S3 (aquí deberías integrar AWS SDK o presigned URLs)
  const uploadToS3 = async (file) => {
    // Aquí deberías obtener una URL firmada desde tu backend y luego hacer fetch PUT
    // Por ahora, solo devolvemos una URL local temporal para previsualización
    return URL.createObjectURL(file);
  };

  const handleAddImage = async (e) => {
    const files = Array.from(e.target.files);
    setMsgError(null);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif'];
    const maxSizeMB = 5;
    let errorMsg = '';
    for (const file of files) {
      // Validar tipo
      if (!allowedTypes.includes(file.type)) {
        errorMsg = `Formato no permitido: ${file.name}. Solo JPG, JPEG, PNG o WEBP.`;
        continue;
      }
      // Validar tamaño
      if (file.size > maxSizeMB * 1024 * 1024) {
        errorMsg = `El archivo ${file.name} supera el tamaño máximo de ${maxSizeMB}MB.`;
        continue;
      }
      const url = await uploadToS3(file);
      setArrayImages(prev => ([...prev, { file, url, name: file.name }]));
    }
    if (errorMsg) setMsgError(errorMsg);
    // Limpiar el input para permitir volver a subir la misma imagen si se desea
    fileInputRef.current.value = '';
  };

  const handleDeleteImage = (imgName) => {
    setArrayImages(arrayImages.filter(img => img.name !== imgName));
  };

  return (
    <>
  <div className={style.containerInput} style={{flexDirection: 'column', alignItems: 'flex-start', gap: '12px'}}>
        <label style={{fontWeight: 600, marginBottom: 8}}>Selecciona imágenes (JPG, PNG, mínimo 5):</label>
        <label
          htmlFor="file-upload"
          className={style.btn + ' ' + style.btnPlus}
          style={{display: 'inline-block', cursor: 'pointer', marginBottom: 8, textAlign: 'center', paddingTop: 10}}>
          Elegir archivos
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleAddImage}
          style={{display: 'none'}}
        />
        {msgError && <span className={style.msgErrorInvalidForm}>{msgError}</span>}
        {arrayImages.length > 0 && arrayImages.length < 5 && (
          <span className={style.msgErrorInvalidForm}>
            Debes añadir al menos 5 imágenes para continuar.
          </span>
        )}
      </div>
      {arrayImages.length > 0 && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: 8}}>
          {arrayImages.map((img, i) => (
            <div key={i} style={{position: 'relative', width: 120, height: 90, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <img src={img.url} alt={img.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <button
                className={`${style.btn} ${style.btnDelete}`}
                onClick={() => handleDeleteImage(img.name)}
                type="button"
                style={{position: 'absolute', top: 4, right: 4, zIndex: 2, background: 'rgba(255,255,255,0.7)'}}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddImages;
