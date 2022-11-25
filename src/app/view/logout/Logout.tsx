import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '~/app/hook/useAuth';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate replace to="/" />;
};

export default Logout;
