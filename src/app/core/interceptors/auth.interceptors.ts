import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem(authService.TOKEN);

  // Skip auth header for public endpoints
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/user')) {
    return next(req);
  }

  if (token && token !== 'null' && token !== '') {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
