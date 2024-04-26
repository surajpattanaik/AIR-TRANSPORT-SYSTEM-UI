import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  role = '';
  selectedRoles: { value: string, viewValue: string }[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'mod', viewValue: 'Moderator' },
    { value: 'user', viewValue: 'User' }
  ];
  isRegister = false;
  isLoggedIn = this.authService.getAccessToken() ? true : false;
  registrationSuccess = false;
  errorMessage = '';

  failedLoginAttempts = 0;
  accountLocked = false;
  lockTimestamp: Date | null = null;
  loginDisabled = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.accountLocked && this.lockTimestamp) {
      const timeDifference = new Date().getTime() - this.lockTimestamp.getTime();
      const lockoutTime = 30 * 60 * 1000; // 30 minutes in milliseconds
      if (timeDifference < lockoutTime) {
        this.accountLocked = true;
        this.loginDisabled = true;
        setTimeout(() => {
          this.accountLocked = false;
          this.loginDisabled = false;
          this.failedLoginAttempts = 0;
        }, lockoutTime - timeDifference);
      }
    }
  }

  setRegister() {
    this.isRegister = true;
  }

  login() {
    if (this.accountLocked && this.lockTimestamp) {
      const timeDifference = new Date().getTime() - this.lockTimestamp.getTime();
      const lockoutTime = 30 * 60 * 1000; // 30 minutes in milliseconds
      if (timeDifference < lockoutTime) {
        const remainingTime = Math.ceil((lockoutTime - timeDifference) / 60000); // Convert to minutes
        this.errorMessage = `Your account is locked. Please try again after ${remainingTime} minutes.`;
        return;
      } else {
        this.accountLocked = false;
        this.loginDisabled = false;
        this.failedLoginAttempts = 0;
      }
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.isLoggedIn = true;
        console.log('Printing Current User details>>>>>>>>>>>'+this.authService.getCurrentUser()?.role[0]);
        console.log('Printing access token>>>>>>>>>>>'+this.authService.getAccessToken());
        this.router.navigate(['/airports']);
      },
      error => {
        this.errorMessage = error.message || 'Login failed';
        console.error('Login error:', error);
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= 3) {
          this.accountLocked = true;
          this.lockTimestamp = new Date();
          this.loginDisabled = true;
          this.errorMessage='Ooops! Your account has been locked! Please wait for 30 minuites...';
          setTimeout(() => {
            this.accountLocked = false;
            this.loginDisabled = false;
            this.failedLoginAttempts = 0;
          }, 30 * 60 * 1000); // 30 minutes in milliseconds
        }
      }
    );
  }

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    console.log('assigned roles in user>>> '+user.role)
    this.authService.register(user.username,user.email,user.password,new Array(user.role)).subscribe(
      response => {
        this.registrationSuccess = true;
        this.isRegister = false;
      },
      error => {
        this.errorMessage = error.message || 'Registration failed';
        console.error('Registration error:', error);
        // Handle registration error
      }
    );
  }
}
