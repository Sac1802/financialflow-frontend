import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';
import { Register } from './shared/components/register/register';
import { Dashboard } from './shared/components/dashboard/dashboard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Dashboard
  }
];
