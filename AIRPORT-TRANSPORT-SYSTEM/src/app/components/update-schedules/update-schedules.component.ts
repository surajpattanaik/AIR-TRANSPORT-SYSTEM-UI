import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule, Airport, Plane } from '../../model/airport.model';
import { AirportService } from '../../service/airport.service';
import { PlaneService } from '../../service/plane.service';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-update-schedules',
  templateUrl: './update-schedules.component.html',
  styleUrl: './update-schedules.component.css'
})
export class UpdateSchedulesComponent implements OnInit {
  schedule: Schedule = { id: '', planeId: '', sourceAirportId: '', destinationAirportId: '', departureTime: '', arrivalTime: '' };
  airports: Airport[] = [];
  planes: Plane[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private airportService: AirportService,
    private planeService: PlaneService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const scheduleId = params.get('id');
      if (scheduleId) {
        this.scheduleService.getScheduleById(scheduleId).subscribe(schedule => {
          this.schedule = schedule;
        });
      }
    });
    this.loadAirports();
    this.loadPlanes();
  }

  onSubmit(): void {
    this.scheduleService.updateSchedule(this.schedule.id, this.schedule).subscribe(() => {
      // Navigate back to the schedule list after updating
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
}
