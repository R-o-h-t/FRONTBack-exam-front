import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import useAuth from '~/app/hook/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    try {
      login({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField inputRef={usernameRef} label="Username" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <TextField inputRef={passwordRef} label="Password" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Register: React.FC = () => {
  const { register } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  const passwordConfirmRef = React.useRef<HTMLInputElement>(null);

  const firstnameRef = React.useRef<HTMLInputElement>(null);

  const lastnameRef = React.useRef<HTMLInputElement>(null);

  const civilStatusRef = React.useRef<HTMLSelectElement>(null);

  const handleRegister = () => {
    try {
      if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        throw new Error('Password does not match');
      }
      register({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        firstname: firstnameRef.current?.value,
        lastname: lastnameRef.current?.value,
        civil: civilStatusRef.current?.value as 'M' | 'F'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField inputRef={usernameRef} label="Username" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <TextField inputRef={passwordRef} label="Password" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <TextField inputRef={passwordConfirmRef} label="Confirm Password" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <TextField inputRef={firstnameRef} label="Firstname" variant="outlined" fullWidth />
        </Grid>
        <Grid xs={12}>
          <TextField inputRef={lastnameRef} label="Lastname" variant="outlined" fullWidth />
        </Grid>

        <Grid xs={12}>
          <Select inputRef={civilStatusRef} label="Civil Status" variant="outlined" fullWidth>
            <MenuItem value={'M'}>Male</MenuItem>
            <MenuItem value={'F'}>Female</MenuItem>
          </Select>
        </Grid>

        <Grid xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Authentication = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const switchMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid
        xs={8}
        sx={{
          mb: 6
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textAlign: 'center',
            mt: 5
          }}
        >
          {isLogin ? 'Login' : 'Register'}
        </Typography>
      </Grid>

      <Grid xs={6}>{isLogin ? <Login /> : <Register />}</Grid>

      <Grid
        xs={12}
        sx={{
          textAlign: 'center',
          m: 2
        }}
      >
        <Button onClick={switchMode}>{isLogin ? 'Register' : 'Login'}</Button>
      </Grid>
    </Grid>
  );
};

export default Authentication;
