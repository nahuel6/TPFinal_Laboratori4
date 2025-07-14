import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      alert('Ya hay una sesión iniciada. Cerrá sesión para entrar con otra cuenta.');
      // Si ya hay un usuario logueado, redirigimos
      this.router.navigate(['/']);
      return false;
    }

    return true; // Permite acceder si NO está autenticado
  }
}
