import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../model/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.loggedInSubject.asObservable();
  public currentUser: User | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signin`, { username, password }).pipe(
      tap((response: any) => {
        const { accessToken,roles, ...userData } = response;
        if (accessToken) {
          this.currentUser = { ...userData, role: [roles[0]] };
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem("currentUser", JSON.stringify(userData));
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("isLoggedIn", 'true');
            sessionStorage.setItem("user-role", this.currentUser?.role[0] || 'ROLE_ADMIN');
            }
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("user-role")
    }
    this.currentUser = null;
    this.loggedInSubject.next(false);
  }

  register(username: string, email: string, password: string, role: string[]): Observable<string> {
    const user = { username, email, password, role };
    console.log({...user});
    console.log('roles>>> '+user.role);
    return this.http.post<string>(`${this.baseUrl}/signup`, user);
  }

  getCurrentUser(): User | null {
    const userString = JSON.stringify(this.currentUser);
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem("currentUser");
    }
    return userString ? JSON.parse(userString) : null;
  }

  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem("accessToken");
    }
    return "";
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem("user-role");
    }
    return "ROLE_ADMIN";
  }
  getLoginStatus(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem("isLoggedIn");
    }
    return "";
  }
}
