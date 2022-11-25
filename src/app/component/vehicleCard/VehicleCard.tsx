import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { Box, Collapse, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

interface IVehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<IVehicleCardProps> = ({ vehicle }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Paper
      sx={{
        maxWidth: 345,
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 3
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Grid container direction="row">
        <Grid xs={12} container>
          <Grid xs={9} container direction="column">
            <Grid>
              <Typography variant="h4">{`${vehicle.brand} ${vehicle.model} `}</Typography>
            </Grid>
            <Grid>
              <Typography variant="h6">({vehicle.year})</Typography>
            </Grid>
          </Grid>
          <Grid xs={3}>
            {vehicle.available ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CheckCircleIcon sx={{ color: 'green' }} />
                <Collapse easing={'cubic-bezier(0.4, 0, 0.2, 1)'} in={hover}>
                  <Typography variant="h6">Available</Typography>
                </Collapse>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CancelIcon sx={{ color: 'red' }} />
                <Collapse easing={'cubic-bezier(0.4, 0, 0.2, 1)'} in={hover}>
                  <Typography variant="body2">Not available</Typography>
                </Collapse>
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sx={{
            height: 120
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}
          >
            <DirectionsCarFilledIcon sx={{ fontSize: 100 }} color={vehicle.available ? 'inherit' : 'disabled'} />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5">{`${vehicle.daily_price} €/Jour`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VehicleCard;
