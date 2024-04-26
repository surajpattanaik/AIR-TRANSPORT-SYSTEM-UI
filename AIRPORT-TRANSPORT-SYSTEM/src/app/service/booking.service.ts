import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  getBookingById(id: string): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.get<Booking>(url);
  }

  deleteBooking(id: string): Observable<void> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateBooking(id: string, booking: Booking): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.put<Booking>(url, booking);
  }
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking);
  }
}
