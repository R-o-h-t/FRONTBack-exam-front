import React, { useState } from 'react';
import query from '~/app/util/query';
import useAuth from '../useAuth';

const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { currentUser, isAdmin } = useAuth();

  React.useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await query(
        {
          url: '/bookings/',
          method: 'GET'
        },
        currentUser.token.access
      );
      console.log(data);
      if (Array.isArray(data) && data[0].id) {
        if (isAdmin) {
          setBookings(data);
        } else {
          setBookings(data.filter((booking) => booking.user === currentUser.id));
        }
      }
    };
    if (isAdmin) {
      fetchBookings();
    } else {
      setBookings(currentUser.bookings);
    }
  }, [currentUser, isAdmin]);

  return { data: bookings };
};

export default useBookings;
