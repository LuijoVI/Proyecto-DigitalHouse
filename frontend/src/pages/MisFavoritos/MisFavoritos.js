import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../context/UserContext';
import style from './MisFavoritos.module.css';

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
  fetch(`/favorites/delete/${id}`, { method: 'DELETE' })
      .then(() => setFavoritos(favoritos.filter(f => f.id !== id)));
  };

  if (loading) return <div>Cargando favoritos...</div>;

  return (
    <div className={style.container}>
      <h2>Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <ul>
          {favoritos.map(fav => (
            <li key={fav.id} className={style.item}>
              <span>Producto: {fav.productName}</span>
              <button onClick={() => eliminarFavorito(fav.id)}>Eliminar</button>
              <button onClick={() => window.location.href = `/product/${fav.productId}`}>Ver</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisFavoritos;
