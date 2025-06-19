import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = environment.apiUrl + '/users';
  

  constructor(private http:HttpClient) { }

getInitialsAvatar(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
}

  getUserProfile() {
    return this.http.get<User>(`${this.url}/getProfile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
}
}
