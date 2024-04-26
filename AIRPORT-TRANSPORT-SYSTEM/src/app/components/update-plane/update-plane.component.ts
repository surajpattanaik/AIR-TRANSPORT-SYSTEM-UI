import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaneService } from '../../service/plane.service';
import { Plane } from '../../model/airport.model';

@Component({
  selector: 'app-update-plane',
  templateUrl: './update-plane.component.html',
  styleUrls: ['./update-plane.component.css']
})
export class UpdatePlaneComponent {
  plane: Plane = { id: '', name: '', capacity: 0, schedules: [], bookings: [] };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planeService: PlaneService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const planeId = params.get('id');
      if (planeId) {
        this.planeService.getPlaneById(planeId).subscribe(plane => {
          this.plane = plane;
        });
      }
    });
  }
  onSubmit(): void {
    this.planeService.updatePlane(this.plane.id,this.plane).subscribe(() => {
      // Navigate back to the planes list after successful update
      this.router.navigate(['/planes']);
    });
  }
}
