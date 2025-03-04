import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Already included
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;
  user$!: Observable<User | null>;
  hidePassword = true; // Add this for password visibility toggle
  // profileImage = 'https://via.placeholder.com/80';
  errorMessage: string | null = null; 

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.user$.subscribe((user: User | null) => {
      if (user) {
        this.updateForm.patchValue({
          name: user.name,
          email: user.email
        });
      }
    });
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const { name, email, password } = this.updateForm.value;
      const userId = this.authService.getCurrentUser()?.id;
      if (userId) {
        this.authService.updateUser(userId, name, email, password).subscribe({
          next: () => this.authService.loadUserProfile(),
          error: (err) => {
            this.errorMessage = err.error?.message || 'Updation failed. Please try again.';
          }
        });
      }else{
        this.authService.loadUserProfile();
        // this.errorMessage = 'Updation failed. Please try again.';
      }
    }
  }
}