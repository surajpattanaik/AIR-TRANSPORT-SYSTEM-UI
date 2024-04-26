import { Component } from '@angular/core';
import { Passenger } from '../../model/airport.model';
import { PassengerService } from '../../service/passengers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passengers.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent {
  passenger: Passenger = { id: '', name: '', bookings: [] };

  constructor(private passengerService: PassengerService, private router: Router) {}

  onSubmit(): void {
    this.passengerService.addPassenger(this.passenger).subscribe(() => {
      // Reset passenger object after successful submission
      this.passenger.id = '';
      this.passenger.name = '';
      this.passenger.bookings = [];
      this.router.navigate(['/passengers']);
    });
  }
}
