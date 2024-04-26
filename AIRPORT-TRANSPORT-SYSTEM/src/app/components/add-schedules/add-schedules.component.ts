import { Component } from '@angular/core';
import { Airport, Passenger, Plane, Schedule } from '../../model/airport.model';
import { AirportService } from '../../service/airport.service';
import { PassengerService } from '../../service/passengers.service';
import { PlaneService } from '../../service/plane.service';
import { ScheduleService } from '../../service/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedules',
  templateUrl: './add-schedules.component.html',
  styleUrl: './add-schedules.component.css'
})
export class AddSchedulesComponent {

  schedule: Schedule = { id: '', planeId: '', sourceAirportId: '', destinationAirportId: '', departureTime: '', arrivalTime: '' };
  airports: Airport[] = [];
  planes: Plane[] = [];
  passengers: Passenger[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private airportService: AirportService,
    private planeService: PlaneService,
    private passengerService: PassengerService,
    private router: Router
  ) {
    this.loadAirports();
    this.loadPlanes();
    this.loadPassengers();
  }

  onSubmit(): void {
    this.scheduleService.addSchedule(this.schedule).subscribe(() => {
      // Reset the form after successful submission
      this.schedule = { id: '', planeId: '', sourceAirportId: '', destinationAirportId: '', departureTime: '', arrivalTime: '' };
      this.router.navigate(['/schedules']);
    });
  }

  private loadAirports(): void {
    this.airportService.getAirports().subscribe(airports => {
      this.airports = airports;
    });
  }

  private loadPlanes(): void {
    this.planeService.getAllPlanes().subscribe(planes => {
      this.planes = planes;
    });
  }

  private loadPassengers(): void {
    this.passengerService.getAllPassengers().subscribe(passengers => {
      this.passengers = passengers;
    });
  }

}
