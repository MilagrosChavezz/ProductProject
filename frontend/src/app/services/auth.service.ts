import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url = environment.apiUrl + '/users';

  isLoggedIn = signal<boolean>(!!localStorage.getItem('user'));

  constructor(private http:HttpClient) { }

  login(user:UserLogin) {
    console.log('Logging in user:', user);
    return this.http.post<UserLogin>(this.url+'/login',user);

  }

  setLoginStatus(token: string) {
    localStorage.setItem('user', token);
    this.isLoggedIn.set(true);
  }
  
  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);

  }

  signup(user: UserLogin) {
    return this.http.post<UserLogin>(this.url+'/signup', user);
  }

  checkLogin() {
    this.isLoggedIn.set(!!localStorage.getItem('user'));
  }
}


