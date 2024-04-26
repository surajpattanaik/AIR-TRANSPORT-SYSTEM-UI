import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Airport } from '../../model/airport.model';
import { AirportService } from '../../service/airport.service';

@Component({
  selector: 'app-update-airport',
  templateUrl: './update-airport.component.html',
  styleUrls: ['./update-airport.component.css']
})
export class UpdateAirportComponent implements OnInit {
  airport: Airport = { id: '', name: '', location: '', schedules: [], bookings: [] };

  constructor(private route: ActivatedRoute, private router: Router, private airportService: AirportService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const airportId = params.get('id');
      if (airportId) {
        this.airportService.getAirportById(airportId).subscribe(airport => {
          this.airport = airport;
        });
      }
    });
  }

  onSubmit(): void {
    this.airportService.updateAirport(this.airport).subscribe(() => {
      // Navigate back to the airport list after updating
      this.router.navigate(['/airports']);
    });
  }
}
