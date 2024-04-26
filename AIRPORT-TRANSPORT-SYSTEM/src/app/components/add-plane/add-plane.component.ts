import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaneService } from '../../service/plane.service';
import { Plane } from '../../model/airport.model';

@Component({
  selector: 'app-add-plane',
  templateUrl: './add-plane.component.html',
  styleUrls: ['./add-plane.component.css']
})
export class AddPlaneComponent {
  plane: Plane = { id: '', name: '', capacity: 0, schedules: [], bookings: [] };

  constructor(private router: Router, private planeService: PlaneService) {}

  onSubmit(): void {
    this.planeService.addPlane(this.plane).subscribe(() => {
      this.router.navigate(['/planes']);
    });
  }
}
