/* eslint-disable react/react-in-jsx-scope */
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';
import useAuth from '../hook/useAuth';

import './Header.scss';

export default function Header() {
  const { isAdmin, isAuthenticated, refreshToken } = useAuth();

  return (
    <header>
      <Grid
        container
        sx={{
          width: '100%',
          mt: 2,
          p: 2
        }}
        spacing={2}
      >
        <Grid>
          <NavLink to="/vehicles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Vehicles
          </NavLink>
        </Grid>
        <Grid>
          <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Booking
          </NavLink>
        </Grid>

        {isAdmin && (
          <Grid>
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Admin
            </NavLink>
          </Grid>
        )}

        {isAuthenticated && (
          <Grid
            sx={{
              marginLeft: 'auto'
            }}
          >
            <NavLink to="/logout" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <LogoutIcon />
            </NavLink>
          </Grid>
        )}

        {isAuthenticated && (
          <Grid>
            <button
              type="button"
              onClick={() => {
                refreshToken();
              }}
            >
              Refresh Token
            </button>
          </Grid>
        )}
      </Grid>
    </header>
  );
}
