import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../model/airport.model';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {
  booking: Booking = { id: '', scheduleId: '', passengerId: '', seatNumber: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('id');
      if (bookingId) {
        this.bookingService.getBookingById(bookingId).subscribe(booking => {
          this.booking = booking;
        });
      }
    });
  }

  onSubmit(): void {
    this.bookingService.updateBooking(this.booking.id, this.booking).subscribe(() => {
      // Navigate back to the booking list after updating
      this.router.navigate(['/bookings']);
    });
  }
}
