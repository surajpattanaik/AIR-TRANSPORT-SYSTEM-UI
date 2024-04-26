import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private baseUrl = 'http://localhost:8080/api/airports';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.baseUrl);
  }

  getAirportById(airportId: string): Observable<Airport> {
    const url = `${this.baseUrl}/${airportId}`;
    return this.http.get<Airport>(url);
  }

  deleteAirport(airportId: string): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${airportId}`;
    return this.http.delete(deleteUrl);
  }

  updateAirport(airport: Airport): Observable<any> {
    const updateUrl = `${this.baseUrl}/${airport.id}`;
    return this.http.put(updateUrl, airport);
  }
  addAirport(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.baseUrl, airport);
  }
}
