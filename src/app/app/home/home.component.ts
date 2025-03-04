import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Add this
import { MatButtonModule } from '@angular/material/button'; // Add this
import { RouterLink } from '@angular/router'; // Add this

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule, // Add this
    MatButtonModule, // Add this
    RouterLink // Add this
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}