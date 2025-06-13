import { Component, OnInit, signal, Signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
 selectedAvatar!: string;


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();

  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.selectedAvatar =  this.userService.getInitialsAvatar(`${this.user.firstName} ${this.user.lastName}`);
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }



}
