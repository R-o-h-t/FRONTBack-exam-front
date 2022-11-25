import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import useAuth from '~/app/hook/useAuth';
import Authentication from '~/app/view/authentication/Authentication';

interface IAuthenticatorProps {
  children: React.ReactNode;
}

const Authenticator: React.FC<IAuthenticatorProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box>
        <Authentication />
      </Box>
    );
  }

  return <>{children}</>;
};

export default Authenticator;
