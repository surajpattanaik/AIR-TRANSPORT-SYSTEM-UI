import { Component } from '@angular/core';
import { Airport } from '../../model/airport.model';
import { AirportService } from '../../service/airport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent {
  airport: Airport = { id: '', name: '', location: '', schedules: [], bookings: [] };

  constructor(private airportService: AirportService,private router: Router) { }

  onSubmit(): void {
    this.airportService.addAirport(this.airport).subscribe(() => {
      // Reset the form after successful submission
      this.airport = { id: '', name: '', location: '', schedules: [], bookings: [] };
      this.router.navigate(['/airports']);
    });
  }
}
