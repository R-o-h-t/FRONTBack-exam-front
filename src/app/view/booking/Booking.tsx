import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import BookingCard from '~/app/component/bookingCard/BookingCard';
import useBookings from '~/app/hook/booking/useBookings';

const BookingView: React.FC = () => {
  const { data: bookings } = useBookings();

  return (
    <div>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid
            key={booking.id}
            sx={{
              mt: 2
            }}
          >
            <BookingCard booking={booking} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookingView;
