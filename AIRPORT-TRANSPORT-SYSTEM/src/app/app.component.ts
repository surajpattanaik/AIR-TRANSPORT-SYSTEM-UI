import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ATS-App';
  isLoggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService: AuthService) {}

  ngOnInit(): void {
       this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    const isLoggedInStr = this.authService.getLoginStatus();
    this.isLoggedIn = isLoggedInStr === 'true';
    console.log('session storage value>>> '+isLoggedInStr);
    console.log('logged in status>>>');
    console.log(this.isLoggedIn);
  }
}
