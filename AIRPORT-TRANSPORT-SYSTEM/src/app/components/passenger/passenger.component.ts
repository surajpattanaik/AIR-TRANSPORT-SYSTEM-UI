import { Component } from '@angular/core';
import { Passenger } from '../../model/airport.model';
import { PassengerService } from '../../service/passengers.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrl: './../airport/airport.component.css'
})
export class PassengerComponent {

  passengers?: Passenger[];
  passengerService: PassengerService;
  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  // instantiates the employee service
  constructor(passengerService: PassengerService, private router:Router,private authService: AuthService) {
    this.passengerService = passengerService;
  }
  // populates the data into the employees array.
  ngOnInit(): void {
    //inintialize
    this.passengerService.getAllPassengers().subscribe(
      (passengerData) => { this.passengers = passengerData }
    );
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;

  }
  deletePassenger(toDeletePassenger: Passenger): void {
    this.passengerService.deletePassenger(toDeletePassenger.id).subscribe(
      () => {
        // Remove the deleted passenger from the array
        this.passengers = this.passengers?.filter((passenger) => passenger !== toDeletePassenger);
      }
    );
  }
  updatePassenger(id :string) {
    //navigate to update emp comp
    this.router.navigate(['passengers/update/'+id]);
  }
  showBookings(passenger: Passenger) {
    this.router.navigate(['/bookings'], { state: { bookings: passenger.bookings, message:'Bookings in '+passenger.name+' Passenger' } });
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}


