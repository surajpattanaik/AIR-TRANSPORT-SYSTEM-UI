import { Component, OnInit } from '@angular/core';
import { Booking, Schedule } from '../../model/airport.model';
import { BookingService } from '../../service/booking.service';
import { ScheduleService } from '../../service/schedule.service';
import { PassengerService } from '../../service/passengers.service';
import { AirportService } from '../../service/airport.service';
import { PlaneService } from '../../service/plane.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./../airport/airport.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  scheduleDetails: string ="";
  passengerName: string ="";
  message: string = "Showing All Bookings";

  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  constructor(
    private router: Router,
    private airportService: AirportService,
    private bookingService: BookingService,
    private scheduleService: ScheduleService,
    private passengerService: PassengerService,
    private planeService: PlaneService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Retrieve bookings data from the state object
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;

    const state = window.history.state;
    if (state && state.bookings && state.message) {
      this.bookings = state.bookings;
      this.message = state.message;
      this.resolveBookingDetails();
    } else {
    
      this.loadBookings();
    }
  }
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (bookings) => { 
        this.bookings = bookings;
        this.resolveBookingDetails();
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  async resolveBookingDetails(): Promise<void> {
    for (const booking of this.bookings) {
      try {
        const scheduleDetails = await this.getScheduleDetails(booking.scheduleId);
        const passengerName = await this.getPassengerName(booking.passengerId);
        this.scheduleDetails = scheduleDetails;
        this.passengerName = passengerName;
      } catch (error) {
        console.error('Error resolving booking details:', error);
      }
    }
  }

  async getScheduleDetails(scheduleId: string): Promise<string> {
    try {
      const schedule = await this.scheduleService.getScheduleById(scheduleId).toPromise();
      const sourceAirportId = schedule?.sourceAirportId || ''; // Default value in case of undefined
      const destinationAirportId = schedule?.destinationAirportId || ''; // Default value in case of undefined
      const planeId = schedule?.planeId || ''; // Default value in case of undefined
  
      const sourceAirport = await this.airportService.getAirportById(sourceAirportId).toPromise();
      const destinationAirport = await this.airportService.getAirportById(destinationAirportId).toPromise();
      const plane = await this.planeService.getPlaneById(planeId).toPromise();
  
      return `Flight from ${sourceAirport?.name} to ${destinationAirport?.name} with ${plane?.name}`;
    } catch (error) {
      console.error('Error fetching schedule details:', error);
      return 'Details not available';
    }
  }
  
  

  async getPassengerName(passengerId: string): Promise<string> {
    try {
      const passenger = await this.passengerService.getPassengerById(passengerId).toPromise();
      return passenger?.name || '';
    } catch (error) {
      console.error('Error fetching passenger name:', error);
      return 'Unknown';
    }
  }

  deleteBooking(id: string): void {
    if (confirm("Are you sure you want to delete this booking?")) {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.loadBookings();
      });
    }
  }

  updateBooking(id: string): void {
    this.router.navigate(['/bookings/update', id]);
  }
}

