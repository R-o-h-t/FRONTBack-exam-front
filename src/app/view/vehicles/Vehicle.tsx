import { Checkbox, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect } from 'react';
import VehicleCard from '~/app/component/vehicleCard/VehicleCard';
import useVehicles from '~/app/hook/vehicles/useVehicles';

const VehicleView: React.FC = () => {
  const { data: vehicles } = useVehicles();

  const [filteredVehicles, setFilteredVehicles] = React.useState<Vehicle[]>([]);

  const [filter, setFilter] = React.useState<string>('');

  const [available, setAvailable] = React.useState<boolean>(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (filter || available) {
      const filtered = vehicles.filter((vehicle) => {
        return (
          vehicle.brand.toLowerCase().includes(filter.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(filter.toLowerCase()) ||
          vehicle.year.toString().includes(filter)
        );
      });
      if (available) {
        setFilteredVehicles(filtered.filter((vehicle) => vehicle.available));
      } else {
        setFilteredVehicles(filtered);
      }
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [filter, vehicles, available]);

  return (
    <div>
      <Grid
        sx={{
          p: 5
        }}
        container
        spacing={2}
      >
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Checkbox
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredVehicles?.map((vehicle) => (
          <Grid
            key={vehicle.id}
            sx={{
              mt: 2
            }}
          >
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleView;
