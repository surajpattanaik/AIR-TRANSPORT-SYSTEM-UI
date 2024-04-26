import { Component } from '@angular/core';
import { Plane } from '../../model/airport.model';
import { PlaneService } from '../../service/plane.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrl: './../airport/airport.component.css'
})
export class PlaneComponent {

  planes?: Plane[];
  planeService: PlaneService;
  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  // instantiates the employee service
  constructor(planeService: PlaneService, private router:Router,private authService: AuthService) {
    this.planeService = planeService;
  }
  // populates the data into the employees array.
  ngOnInit(): void {
    //inintialize
    this.planeService.getAllPlanes().subscribe(
      (planeData) => { this.planes = planeData }
    );
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;

  }
  deletePlane(toDeletePlane: Plane): void {
    this.planeService.deletePlane(toDeletePlane.id).subscribe(
      () => {
        // Remove the deleted plane from the array
        this.planes = this.planes?.filter((plane) => plane !== toDeletePlane);
      }
    );
  }
  updatePlane(id :string) {
    //navigate to update emp comp
    this.router.navigate(['planes/update/'+id]);
  }
  showSchedules(plane: Plane) {
    this.router.navigate(['/schedules'], { state: { schedules: plane.schedules, message:'Schedules in '+plane.name+' Plane'} });
    console.log(plane.schedules);
  }

  showBookings(plane: Plane) {
    this.router.navigate(['/bookings'], { state: { bookings: plane.bookings, message:'Bookings in '+plane.name+' Plane' } });
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}


