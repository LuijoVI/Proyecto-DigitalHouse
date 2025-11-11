import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../context/UserContext';
import style from './MisFavoritos.module.css';
import Product from '../../components/Product/Product';

const MisFavoritos = () => {
  const { userInfo } = useContext(userContext);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      console.log('MisFavoritos: solicitando favoritos para el usuario', userInfo.id);
      fetch(`/favorites/user/${userInfo.id}`)
        .then(res => {
          if (!res.ok) {
            console.error('MisFavoritos: error al recuperar favoritos:', res.status);
            setLoading(false);
            return [];
          }
          return res.json();
        })
        .then(data => {
          console.log('MisFavoritos: favoritos recibidos:', data);
          setFavoritos(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('MisFavoritos: error de red o parseo:', err);
          setLoading(false);
        });
    } else {
      console.log('MisFavoritos: no se pudo recuperar el id del usuario');
      setLoading(false);
    }
  }, [userInfo]);

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter(f => f.id !== id));
  };

  if (loading) return <div>Cargando favoritos...</div>;

  return (
    <div className={style.container}>
      <h2>Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <div className={style.cardsContainer}>
          {favoritos.map(fav => (
            <div key={fav.id} className={style.cardWrapper}>
              <Product
                id={fav.product.id}
                imgUrl={fav.product.image || fav.product.images || []}
                category={fav.product.category}
                title={fav.product.name || fav.product.title}
                description={fav.product.description}
                location={fav.product.city}
                address={fav.product.address}
                attributes={fav.product.attributes}
                latitude={fav.product.latitude}
                longitude={fav.product.longitude}
                policiesSite={fav.product.policiesSite}
                policiesSecurityAndHealth={fav.product.policiesSecurityAndHealth}
                policiesCancellation={fav.product.policiesCancellation}
                averageScore={fav.product.average_score || fav.product.averageScore}
                favoriteId={fav.id}
                onFavoriteRemove={() => eliminarFavorito(fav.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisFavoritos;
