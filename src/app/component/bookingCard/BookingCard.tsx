import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { Box, Collapse, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

interface IBookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<IBookingCardProps> = ({ booking }) => {
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
              <Typography variant="h4">{`${booking.date}`}</Typography>
            </Grid>
            <Grid>
              <Typography variant="h6">({booking.days} jours)</Typography>
            </Grid>
          </Grid>
          <Grid xs={3}>
            {booking.days ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CheckCircleIcon sx={{ color: 'green' }} />
                <Collapse easing={'cubic-bezier(0.4, 0, 0.2, 1)'} in={hover}>
                  <Typography variant="h6">Ended</Typography>
                </Collapse>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CancelIcon sx={{ color: 'red' }} />
                <Collapse easing={'cubic-bezier(0.4, 0, 0.2, 1)'} in={hover}>
                  <Typography variant="body2">On Going</Typography>
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
            <DirectionsCarFilledIcon sx={{ fontSize: 100 }} color={booking.days ? 'inherit' : 'disabled'} />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5">{`${booking.total_price} €/Jour`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookingCard;
