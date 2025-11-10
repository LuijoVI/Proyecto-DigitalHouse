import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../context/UserContext';
import style from './MisReservas.module.css';

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
        <ul>
          {reservas.map(reserva => (
            <li key={reserva.id} className={style.item}>
              <span>Reserva #{reserva.id} - {reserva.productName}</span>
              <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
              <button onClick={() => window.location.href = `/reservations/${reserva.id}`}>Ver</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisReservas;
