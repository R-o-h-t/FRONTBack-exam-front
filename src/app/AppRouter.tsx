import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './hook/useAuth';
import { Header } from './layout';
import Admin from './view/admin/Admin';
import Booking from './view/booking/Booking';
import Logout from './view/logout/Logout';
import Vehicle from './view/vehicles/Vehicle';

const AdminRouter: React.FC = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default function AppRouter() {
  const LoadingMessage = () => <div>Loading..,</div>;

  return (
    <BrowserRouter>
      <Header />
      <Box
        sx={{
          width: '95%',
          margin: '0 auto',
          padding: 2,
          borderBottom: '1px solid #ccc'
        }}
      ></Box>
      <Box
        sx={{
          width: '90%',
          height: '90%',
          margin: 'auto'
        }}
      >
        <Suspense fallback={<LoadingMessage />}>
          <Routes>
            <Route path="/vehicles" element={<Vehicle />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/admin" element={<AdminRouter />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/" element={<Navigate replace to="/vehicles" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Box>
    </BrowserRouter>
  );
}
