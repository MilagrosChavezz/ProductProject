import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin.model';
import { AuthResponse } from '../models/authResponse.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url:string = environment.apiUrl + '/users';

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isLoggedIn.set(!!event.newValue);
      }
    });
  }

  login(userLogin: UserLogin):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/login', userLogin);
  }

  setLoginStatus(token: string, user: User):void {
    localStorage.setItem('role', user.role ?? '');
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
    this.checkLogin();
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn.set(false);
    this.checkLogin();
  }

  signup(user: UserLogin):Observable<User> {
    return this.http.post<User>(this.url + '/signup', user);
  }

  checkLogin():void {
    this.isLoggedIn.set(!!localStorage.getItem('token'));
  }
}
