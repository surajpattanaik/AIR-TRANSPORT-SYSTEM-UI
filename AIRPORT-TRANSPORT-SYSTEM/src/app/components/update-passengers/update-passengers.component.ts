import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../model/airport.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../../service/passengers.service';

@Component({
  selector: 'app-update-passengers',
  templateUrl: './update-passengers.component.html',
  styleUrl: './update-passengers.component.css'
})
export class UpdatePassengersComponent implements OnInit {
  passenger: Passenger = { id: '', name: '', bookings: [] };

  constructor(private route: ActivatedRoute, private router: Router, private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.passengerService.getPassengerById(id).subscribe(passenger => {
          this.passenger = passenger;
        });
      }
    });
  }

  onSubmit(): void {
    this.passengerService.updatePassenger(this.passenger.id,this.passenger).subscribe(() => {
      // Navigate back to the airport list after updating
      this.router.navigate(['/passengers']);
    });
  }
}
