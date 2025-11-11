import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../context/UserContext';
import style from './MisReservas.module.css';
import Product from '../../components/Product/Product';

const MisReservas = () => {
  const { userInfo } = useContext(userContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      console.log('MisReservas: solicitando reservaciones para el usuario', userInfo.id);
      fetch(`/reservations/user/${userInfo.id}`)
        .then(res => {
          if (!res.ok) {
            console.error('MisReservas: error al recuperar reservaciones:', res.status);
            setLoading(false);
            return [];
          }
          return res.json();
        })
        .then(data => {
          console.log('MisReservas: reservaciones recibidas:', data);
          setReservas(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('MisReservas: error de red o parseo:', err);
          setLoading(false);
        });
    } else {
      console.log('MisReservas: no se pudo recuperar el id del usuario');
      setLoading(false);
    }
  }, [userInfo]);

  const eliminarReserva = (id) => {
    fetch(`/reservations/delete/${id}`, { method: 'DELETE' })
      .then(() => setReservas(reservas.filter(r => r.id !== id)));
  };

  if (loading) return <div>Cargando reservaciones...</div>;

  return (
    <div className={style.container}>
      <h2>Mis Reservas</h2>
      {reservas.length === 0 ? (
        <p>No tienes reservaciones.</p>
      ) : (
        <div className={style.cardsContainer}>
          {reservas.map(reserva => (
            <div key={reserva.id} className={style.cardWrapper}>
              <Product
                id={reserva.product.id}
                imgUrl={reserva.product.image || reserva.product.images || []}
                category={reserva.product.category}
                title={reserva.product.name || reserva.product.title}
                description={reserva.product.description}
                location={reserva.product.city}
                address={reserva.product.address}
                attributes={reserva.product.attributes}
                latitude={reserva.product.latitude}
                longitude={reserva.product.longitude}
                policiesSite={reserva.product.policiesSite}
                policiesSecurityAndHealth={reserva.product.policiesSecurityAndHealth}
                policiesCancellation={reserva.product.policiesCancellation}
                averageScore={reserva.product.average_score || reserva.product.averageScore}
                renderDeleteButton={() => (
                  <button
                    className={style.deleteBtn}
                    style={{ width: '100%', marginTop: '8px' }}
                    onClick={() => eliminarReserva(reserva.id)}
                  >
                    Eliminar reserva
                  </button>
                )}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisReservas;
