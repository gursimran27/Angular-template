import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './app/home/home.component';
import { ProfileComponent } from './app/profile/profile.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthGuard2 } from './shared/services/auth-guard2.service';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  // { path: 'auth/login', component: LoginComponent },
  // { path: 'auth/register', component: RegisterComponent },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthGuard2],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', redirectTo: '/auth/login' }
];