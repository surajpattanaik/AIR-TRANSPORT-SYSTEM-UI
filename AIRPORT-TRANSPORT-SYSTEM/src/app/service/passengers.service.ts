import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private passengersUrl = 'http://localhost:8080/api/passengers';

  constructor(private http: HttpClient) { }

  getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.passengersUrl);
  }

  getPassengerById(id: string): Observable<Passenger> {
    const url = `${this.passengersUrl}/${id}`;
    return this.http.get<Passenger>(url);
  }

  deletePassenger(id: string): Observable<void> {
    const url = `${this.passengersUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updatePassenger(id: string, passenger: Passenger): Observable<Passenger> {
    const url = `${this.passengersUrl}/${id}`;
    return this.http.put<Passenger>(url, passenger);
  }
  addPassenger(passenger: Passenger): Observable<any> {
    return this.http.post(this.passengersUrl, passenger);
  }
}
