import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userName: string | null = '';

  constructor(private router: Router,private authService: AuthService ) {}

  ngOnInit(): void {
    // Obtiene el nombre del usuario logueado desde el localStorage (o desde un servicio si tienes uno)
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (this.authService.isAuthenticated()) {
      this.userName = this.authService.getUserName();
  
    }
    if (user && user.name) {
      this.userName = user.name;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userName = null;
    this.authService.logout();
  
   // this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
