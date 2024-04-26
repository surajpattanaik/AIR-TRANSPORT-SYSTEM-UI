export interface Airport {
  id: string;
  name: string;
  location: string;
  schedules: Schedule[];
  bookings: Booking[];
}
export interface Schedule {
  id: string;
  planeId: string;
  sourceAirportId: string;
  destinationAirportId: string;
  departureTime: string;
  arrivalTime: string;
}
export interface Booking {
  id: string;
  scheduleId: string;
  passengerId: string;
  seatNumber: number;
}

export interface Plane {
  id: string;
  name: string;
  capacity: number;
  schedules: Schedule[];
  bookings: Booking[];
}
export interface Passenger {
  id: string;
  name: string;
  bookings: Booking[];
}
