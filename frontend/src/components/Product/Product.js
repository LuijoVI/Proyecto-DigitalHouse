import React, { useState, useContext } from 'react';
import { userContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import style from './Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fas,
  faHeart,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const Product = ({
  id,
  imgUrl,
  category,
  title,
  description,
  location,
  attributes,
  averageScore,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const { userInfo } = useContext(userContext);

  // Consultar si el producto es favorito al montar el componente
  React.useEffect(() => {
    if (userInfo && userInfo.id) {
      fetch(`/favorites/user/${userInfo.id}`)
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          const fav = data.find(f => f.productId === id || (f.product && f.product.id === id));
          if (fav) {
            setIsFavorite(true);
            setFavoriteId(fav.id);
            console.log('Product: producto es favorito, id:', fav.id);
          } else {
            setIsFavorite(false);
            setFavoriteId(null);
            console.log('Product: producto no es favorito');
          }
        })
        .catch(err => {
          console.error('Product: error al consultar favoritos:', err);
        });
    }
  }, [userInfo, id]);

  const handleAddFavorite = async () => {
    if (!userInfo || !userInfo.id) {
      console.log('Product: usuario no logueado, no se puede agregar/eliminar favorito');
      return;
    }
    if (!isFavorite) {
      // Agregar favorito
      console.log('Product: intentando agregar favorito');
      console.log('Product: userId:', userInfo.id);
      console.log('Product: productId:', id);
      try {
        const res = await fetch('/favorites/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { id: userInfo.id }, product: { id } })
        });
        if (!res.ok) {
          console.error('Product: error al agregar favorito:', res.status);
        } else {
          const data = await res.json();
          setIsFavorite(true);
          setFavoriteId(data.id);
          console.log('Product: favorito agregado correctamente, id:', data.id);
          // Actualizar estado tras agregar favorito
          fetch(`/favorites/user/${userInfo.id}`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
              const fav = data.find(f => f.productId === id || (f.product && f.product.id === id));
              if (fav) {
                setIsFavorite(true);
                setFavoriteId(fav.id);
              }
            });
        }
      } catch (err) {
        console.error('Product: error de red al agregar favorito:', err);
      }
    } else {
      // Eliminar favorito
      if (!favoriteId) {
        console.error('Product: no se encontró el id del favorito para eliminar');
        return;
      }
      console.log('Product: eliminando favorito con id', favoriteId);
      try {
  const res = await fetch(`/favorites/delete/${favoriteId}`, { method: 'DELETE' });
        if (!res.ok) {
          console.error('Product: error al eliminar favorito:', res.status);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
          console.log('Product: favorito eliminado correctamente');
          // Actualizar estado tras eliminar favorito
          fetch(`/favorites/user/${userInfo.id}`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
              const fav = data.find(f => f.productId === id || (f.product && f.product.id === id));
              if (!fav) {
                setIsFavorite(false);
                setFavoriteId(null);
              }
            });
        }
      } catch (err) {
        console.error('Product: error de red al eliminar favorito:', err);
      }
    }
  };

  const textScore = (rating) => {
    let text =
      rating >= 0 && rating <= 2.5
        ? 'Muy Malo'
        : rating >= 2.6 && rating <= 5
        ? 'Malo'
        : rating >= 5.1 && rating <= 6.5
        ? 'Regular'
        : rating >= 6.6 && rating <= 8
        ? 'Bueno'
        : 'Muy bueno';
    return text;
  };

  // Función para obtener el color según el rating
  const getScoreColor = (rating) => {
    if (rating >= 0 && rating <= 2.5) return '#e53935'; // rojo
    if (rating > 2.5 && rating <= 5) return '#ffb300'; // naranja
    if (rating > 5 && rating <= 6.5) return '#fdd835'; // amarillo
    if (rating > 6.5 && rating <= 8) return '#43a047'; // verde medio
    return '#2e7d32'; // verde fuerte
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.productImageContainer}>
        <FontAwesomeIcon
          onClick={handleAddFavorite}
          className={style.productFavorite}
          icon={!isFavorite ? faHeartRegular : faHeart}
        />
        <img className={style.productImage} src={imgUrl[0]?.url} alt={title} />
      </div>
      <div className={style.cardDetails}>
        <div className={style.row1}>
          <div className={style.productInitialContainer}>
            <div className={style.productCategoryContainer}>
              <p className={style.productCategory}>{category.name}</p>
            </div>
            <h5 className={style.productTitle}>{title}</h5>
          </div>
          {/* Score */}
          <div className={style.productScore}>
            <span
              className={style.scoreNumber}
              style={{ background: getScoreColor(averageScore ?? 1) }}
            >
              {averageScore ? averageScore : 1}
            </span>
            <p className={style.scoreText}>{textScore(averageScore)}</p>
          </div>
        </div>

        <div className={style.productInformation}>
          <p className={style.productLocation}>
            <FontAwesomeIcon icon={faLocationDot} /> {location.name} -{' '}
            <Link className={style.linkLocation} href="#a">
              Mostrar en el mapa
            </Link>{' '}
          </p>
          {/* attributes */}
          <div className={style.propertyHighlights}>
            {attributes?.map((attribute) => (
              <FontAwesomeIcon icon={fas[attribute?.icon]} key={attribute.id} />
            ))}
          </div>
        </div>

        <p className={style.productDescription}>{description}</p>
        <Link to={`/products/${id}`} className={`btn btn2 w-100`}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Product;
