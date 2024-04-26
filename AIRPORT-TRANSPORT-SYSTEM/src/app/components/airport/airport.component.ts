import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airport } from '../../model/airport.model';
import { AirportService } from '../../service/airport.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrl: './airport.component.css'
})
export class AirportComponent implements OnInit {
  airports?: Airport[];
  airportService: AirportService;
  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  // instantiates the employee service
  constructor(airportService: AirportService, private router:Router,private authService: AuthService) {
    this.airportService = airportService;
  }
  // populates the data into the employees array.
  ngOnInit(): void {
    //inintialize
    this.airportService.getAirports().subscribe(
      (airportData) => { this.airports = airportData }
    );
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;
  }
  deleteAirport(toDeleteAirport: Airport): void {
    this.airportService.deleteAirport(toDeleteAirport.id).subscribe(
      () => {
        // Remove the deleted airport from the array
        this.airports = this.airports?.filter((airport) => airport !== toDeleteAirport);
      }
    );
  }
  updateAirport(id :string) {
    //navigate to update emp comp
    this.router.navigate(['airports/update/'+id]);
  }
  showSchedules(airport: Airport) {
    this.router.navigate(['/schedules'], { state: { schedules: airport.schedules, message:'Schedules in '+airport.name+' Airport'} });
    console.log(airport.schedules);
  }

  showBookings(airport: Airport) {
    this.router.navigate(['/bookings'], { state: { bookings: airport.bookings, message:'Bookings in '+airport.name+' Airport' } });
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

