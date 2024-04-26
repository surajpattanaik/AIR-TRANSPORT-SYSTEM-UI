import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedulesUrl = 'http://localhost:8080/api/schedules';

  constructor(private http: HttpClient) { }

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.schedulesUrl);
  }

  getScheduleById(id: string): Observable<Schedule> {
    const url = `${this.schedulesUrl}/${id}`;
    return this.http.get<Schedule>(url);
  }

  deleteSchedule(id: string): Observable<void> {
    const url = `${this.schedulesUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateSchedule(id: string, schedule: Schedule): Observable<Schedule> {
    const url = `${this.schedulesUrl}/${id}`;
    return this.http.put<Schedule>(url, schedule);
  }
  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.schedulesUrl, schedule);
  }
}
