import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  canActivate(): boolean {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
