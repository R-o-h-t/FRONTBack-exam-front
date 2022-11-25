type User = {
  id: number;
  username: string;
  civil: 'M' | 'F';
  firstname: string;
  lastname: string;
  role: 'A' | 'U';
  token: Token;
  bookings: Booking[];
};

type Token = {
  refresh: string;
  access: string;
};

type UserLogin = {
  username: string;
  password: string;
};

type UserRegister = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  civil: 'M' | 'F';
};

type UserFetch = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  civil: 'M' | 'F';
  role: 'A' | 'U';
  bookings: Booking[];
};

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  daily_price: number;
  image?: string;
  available: boolean;
  bookings: Booking[];
};

type VehicleCreate = {
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  daily_price: number;
};

type Booking = {
  id: number;
  vehicle: Vehicle;
  user: UserFetch;
  date: Date;
  days?: number;
  kilometers?: number;
  total_price?: number;
};

type BookingCreate = {
  user_id: number;
  vehicle_id: number;
  date: Date;
};
