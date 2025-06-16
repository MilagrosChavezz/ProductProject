import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin.model';
import { AuthResponse } from '../models/authResponse.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl + '/users';

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

login(userLogin: UserLogin) {
  return this.http.post<AuthResponse>(this.url + '/login', userLogin);
}


  setLoginStatus(token: string, user: User) {
    localStorage.setItem('role', user.role ?? '');
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  signup(user: UserLogin) {
    return this.http.post<UserLogin>(this.url + '/signup', user);
  }

  checkLogin() {
    this.isLoggedIn.set(!!localStorage.getItem('token'));
  }
}
