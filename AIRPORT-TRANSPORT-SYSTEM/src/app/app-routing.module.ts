import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AirportComponent } from './components/airport/airport.component';
import { BookingComponent } from './components/booking/booking.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PlaneComponent } from './components/plane/plane.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { UpdateAirportComponent } from './components/update-airport/update-airport.component';
import { AddPlaneComponent } from './components/add-plane/add-plane.component';
import { UpdatePlaneComponent } from './components/update-plane/update-plane.component';
import { UpdatePassengersComponent } from './components/update-passengers/update-passengers.component';
import { AddPassengerComponent } from './components/add-passengers/add-passengers.component';
import { AddSchedulesComponent } from './components/add-schedules/add-schedules.component';
import { UpdateSchedulesComponent } from './components/update-schedules/update-schedules.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component';

const routes : Routes = [
  {path : '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path : 'airports', redirectTo: 'airports/view', pathMatch: 'full'},
  {path: 'airports/view', component:AirportComponent},
  {path: 'airports/add', component:AddAirportComponent},
  {path: 'airports/update/:id', component:UpdateAirportComponent},
  {path: 'bookings',redirectTo: 'bookings/view', pathMatch: 'full'},
  {path: 'schedules', redirectTo: 'schedules/view', pathMatch: 'full'},
  {path: 'bookings/view', component:BookingComponent},
  {path: 'bookings/add', component:AddBookingComponent},
  {path: 'bookings/update/:id', component:UpdateBookingComponent},
  {path: 'schedules/view', component:ScheduleComponent},
  {path: 'schedules/add', component:AddSchedulesComponent},
  {path: 'schedules/update/:id', component:UpdateSchedulesComponent},
  {path : 'planes', redirectTo: 'planes/view', pathMatch: 'full'},
  {path: 'planes/view', component:PlaneComponent},
  {path: 'planes/add', component:AddPlaneComponent},
  {path: 'planes/update/:id', component:UpdatePlaneComponent},
  {path : 'passengers', redirectTo: 'passengers/view', pathMatch: 'full'},
  {path: 'passengers/view', component:PassengerComponent},
  {path: 'passengers/add', component:AddPassengerComponent},
  {path: 'passengers/update/:id', component:UpdatePassengersComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
