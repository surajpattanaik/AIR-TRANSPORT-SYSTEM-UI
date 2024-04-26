import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../model/airport.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../service/schedule.service';
import { AirportService } from '../../service/airport.service';
import { PlaneService } from '../../service/plane.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './../airport/airport.component.css'
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  sairport: string ="";
  dairport: string ="";
  plane: string ="";
  message: string = "Showing All Schedules";
  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private airportService: AirportService,
    private planeService: PlaneService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Retrieve schedules data from the state object
    const state = window.history.state;
    if (state && state.schedules && state.message) {
      this.schedules = state.schedules;
      this.message = state.message;
      this.populateDetails();
    } else {
      this.loadSchedules();
    }
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;

  }

  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe(
      (schedules) => { 
        this.schedules = schedules;
        this.populateDetails();
      }
    );
  }

  populateDetails(): void {
    this.schedules.forEach(schedule => {
      this.airportService.getAirportById(schedule.sourceAirportId).subscribe(
        airport => this.sairport = airport.name
      );
      this.airportService.getAirportById(schedule.destinationAirportId).subscribe(
        airport => this.dairport = airport.name
      );
      this.planeService.getPlaneById(schedule.planeId).subscribe(
        plane => this.plane = plane.name
      );
    });
  }

  updateSchedule(id: string): void {
    this.router.navigate(['/schedules/update/'+ id]);
  }

  deleteSchedule(id: string): void {
    if (confirm("Are you sure you want to delete this schedule?")) {
      this.scheduleService.deleteSchedule(id).subscribe(() => {
        this.loadSchedules();
      });
    }
  }
}