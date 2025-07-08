import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url:string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getInitialsAvatar(name: string): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name
    )}`;
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/getProfile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
