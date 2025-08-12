import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.estaAutenticado(); // o getUserName() !== null

    if (!isAuthenticated) {
      localStorage.setItem('rutaPostLogin', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
