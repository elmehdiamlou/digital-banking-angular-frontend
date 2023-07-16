import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { DecodedJwt, LoginResponse } from '../model/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  roles: string | undefined;
  username: string | undefined;
  accessToken: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<LoginResponse>(
      environment.backendHost + '/auth/login',
      params,
      options
    );
  }

  loadProfile(data: LoginResponse) {
    this.isAuthenticated = true;
    this.accessToken = data['access_token'];
    const decodedJwt: DecodedJwt = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem('access_token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.username = this.roles = this.accessToken = undefined;
    window.localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }

  loadJwtAMLTokenFromLocalStorage() {
    const token = window.localStorage.getItem('access_token');
    if (token) {
      this.loadProfile({ access_token: token });
      this.router.navigateByUrl('/admin/customers');
    }
  }
}
