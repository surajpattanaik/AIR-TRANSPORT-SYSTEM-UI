import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AirportComponent } from './components/airport/airport.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BookingComponent } from './components/booking/booking.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PlaneComponent } from './components/plane/plane.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { UpdateAirportComponent } from './components/update-airport/update-airport.component';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { UpdatePlaneComponent } from './components/update-plane/update-plane.component';
import { AddPlaneComponent } from './components/add-plane/add-plane.component';
import { UpdatePassengersComponent } from './components/update-passengers/update-passengers.component';
import { AddSchedulesComponent } from './components/add-schedules/add-schedules.component';
import { UpdateSchedulesComponent } from './components/update-schedules/update-schedules.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component';
import { AddPassengerComponent } from './components/add-passengers/add-passengers.component';
import { JwtInterceptor } from './service/jwt.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AirportComponent,
    BookingComponent,
    ScheduleComponent,
    PlaneComponent,
    PassengerComponent,
    UpdateAirportComponent,
    AddAirportComponent,
    UpdatePlaneComponent,
    AddPlaneComponent,
    AddPassengerComponent,
    UpdatePassengersComponent,
    AddSchedulesComponent,
    UpdateSchedulesComponent,
    AddBookingComponent,
    UpdateBookingComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


