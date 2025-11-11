import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';


const AdminRoute = ({ children }) => {
  const { userInfo } = useContext(userContext);

  // Debug: mostrar información del usuario y rol
  console.log('AdminRoute: userInfo:', userInfo);
  if (userInfo) {
    console.log('AdminRoute: user role:', userInfo.role);
  } else {
    console.log('AdminRoute: No se pudo recuperar la información del usuario');
  }

  // Si no hay usuario o el rol no es ADMIN, redirige al home
  if (!userInfo || userInfo.role !== 'ADMIN') {
    console.log('AdminRoute: Acceso denegado. Redirigiendo al home.');
    return <Navigate to="/" replace />;
  }

  console.log('AdminRoute: Acceso permitido. Renderizando componente hijo.');
  return children;
};

export default AdminRoute;
