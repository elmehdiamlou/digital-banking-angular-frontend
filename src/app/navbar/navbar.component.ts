import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string | undefined;
  isAdmin = false;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authservice.username;
    this.isAdmin = this.authservice.roles?.includes('ADMIN') ?? false;
  }

  handleLogout() {
    this.authservice.logout();
  }
}
