import { Component, OnInit } from '@angular/core';
import { Booking } from '../../model/airport.model';
import { BookingService } from '../../service/booking.service';
import { ScheduleService } from '../../service/schedule.service';
import { PassengerService } from '../../service/passengers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  booking: Booking = { id: '', scheduleId: '', passengerId: '', seatNumber: 0 };
  schedules: any[] = [];
  passengers: any[] = [];

  constructor(
    private bookingService: BookingService,
    private scheduleService: ScheduleService,
    private passengerService: PassengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
    this.loadPassengers();
  }

  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe(
      (schedules) => { this.schedules = schedules; },
      (error) => { console.error('Error fetching schedules:', error); }
    );
  }

  loadPassengers(): void {
    this.passengerService.getAllPassengers().subscribe(
      (passengers) => { this.passengers = passengers; },
      (error) => { console.error('Error fetching passengers:', error); }
    );
  }

  onSubmit(): void {
    this.bookingService.addBooking(this.booking).subscribe(
      () => {
        // Reset the form after successful submission
        this.booking = { id: '', scheduleId: '', passengerId: '', seatNumber: 0 };
        this.router.navigate(['/bookings']);
      },
      (error) => { console.error('Error adding booking:', error); }
    );
  }
}
