interface BookingProps {
  user: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: string;
  children: string;
  from: Date;
  to: Date;
}

export interface User {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}
