import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  userName: string | null = '';
  cantidadReservas: number = 0;

  constructor(private router: Router, private authService: AuthService,private cdRef: ChangeDetectorRef) {}



  ngOnInit(): void {

    /* 1.  ––– Restaurar sesión si existe ––– */
    this.authService.inicializarSesionSiExiste();
  
    /* 2.  ––– Escuchar nombre y #reservas ––– */
    this.authService.userName$.subscribe(name => (this.userName = name));
    this.authService.reservas$.subscribe(cant => (this.cantidadReservas = cant));
  
    /* 3.  ––– Lógica de acceso según ruta ––– */
    const rutasPublicas = ['/', '/login', '/registro', '/destinations', '/paquetes2'];
  
    /** Nos suscribimos solo una vez a los cambios de navegación */
    this.router.events
      .pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
  
        const rutaActual = ev.urlAfterRedirects;
        const usuario    = this.authService.getUsuario();   // localStorage
  
        if (!usuario && !rutasPublicas.includes(rutaActual)) {
          /* No logueado + ruta privada ⟶ login */
          this.router.navigate(['/login']);
          return;
        }
  
        if (usuario) {
          /* Logueado ⟶ refrescamos datos en pantalla */
          this.userName         = usuario.nombre;
          this.cantidadReservas = usuario.reservas?.length ?? 0;
        } else {
          /* Visitante en ruta pública: limpiamos nombre/contador */
          this.userName         = null;
          this.cantidadReservas = 0;
        }
      });
  }

/*
  ngOnInit(): void {
    this.authService.inicializarSesionSiExiste();
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });

    const usuario = this.authService.getUsuario(); // trae del localStorage
    
    if (usuario) {
      this.userName = usuario.nombre;
      this.authService.actualizarCantidadReservas();
      this.cantidadReservas = usuario.reservas ? usuario.reservas.length : 0;
      this.cdRef.detectChanges(); // 🔁 Forzamos la actualización del DOM
    } else {
      this.router.navigate(['/login']);
    }


    // Escucha cambios en la cantidad de reservas
    this.authService.reservas$.subscribe(cantidad => {
      this.cantidadReservas = cantidad;
    });
  }
*/
  logout() {
    localStorage.removeItem('user');
    this.userName = null;
    this.cantidadReservas = 0;
    this.authService.logout();
  }
}

/*



export class AppComponent implements OnInit {
  userName: string | null = '';

  constructor(private router: Router,private authService: AuthService ) {}

  ngOnInit(): void {
   
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });


    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    this.router.navigate(['/login']);
    }else { this.userName = this.authService.getUserName();
  
    }
  
  }

  logout() {
    localStorage.removeItem('user');
    this.userName = null;
    this.authService.logout();
  
   
  }
}
*/