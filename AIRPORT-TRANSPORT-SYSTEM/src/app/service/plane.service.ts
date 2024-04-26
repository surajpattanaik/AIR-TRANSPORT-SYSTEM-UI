import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plane } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  private planesUrl = 'http://localhost:8080/api/planes';

  constructor(private http: HttpClient) { }

  getAllPlanes(): Observable<Plane[]> {
    return this.http.get<Plane[]>(this.planesUrl);
  }

  getPlaneById(id: string): Observable<Plane> {
    const url = `${this.planesUrl}/${id}`;
    return this.http.get<Plane>(url);
  }

  deletePlane(id: string): Observable<void> {
    const url = `${this.planesUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updatePlane(id: string, plane: Plane): Observable<Plane> {
    const url = `${this.planesUrl}/${id}`;
    return this.http.put<Plane>(url, plane);
  }
   addPlane(plane: Plane): Observable<Plane> {
    return this.http.post<Plane>(this.planesUrl, plane);
  }
}
