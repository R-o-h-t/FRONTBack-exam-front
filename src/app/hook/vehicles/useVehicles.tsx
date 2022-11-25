import React from 'react';
import query from '~/app/util/query';
import useAuth from '../useAuth';

const useVehicles = () => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);

  const { token } = useAuth().currentUser || {};

  React.useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await query(
        {
          url: '/vehicles/',
          method: 'GET'
        },
        token.access
      );
      console.log(data);
      if (Array.isArray(data) && data[0].id) {
        setVehicles(data);
      }
    };
    fetchVehicles();
  }, [token]);

  return { data: vehicles };
};

export default useVehicles;
