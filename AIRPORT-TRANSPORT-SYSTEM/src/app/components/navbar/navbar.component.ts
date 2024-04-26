import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private authService: AuthService;

  isAdmin = true;
  isMod = false;
  isUser = false;
  userRole: string = 'ROLE_ADMIN';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,authService: AuthService, private router:Router) {
    this.authService = authService;
  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() ?? 'ROLE_ADMIN';
    this.isAdmin = this.userRole === 'ROLE_ADMIN' ? true : false;
    this.isMod = this.userRole === 'ROLE_MODERATOR' ? true : false;
    this.isUser = this.userRole === 'ROLE_USER' ? true : false;
  }

  logout(){
    this.authService.logout();
  }

}
