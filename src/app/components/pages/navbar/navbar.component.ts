
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownVisible: boolean = false;
  menuAbierto: boolean = false; // 👈 Esto controla el menú hamburguesa

  constructor(private router: Router){}
  
  goToDestinations() {
    this.router.navigate(['/destinations']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  navigateToDestination(destination: string) {
   // this.fetchImage(destination);  // O realiza cualquier lógica necesaria para el destino
    this.isDropdownVisible = false;  // Ocultar el menú al seleccionar un destino
  }

  cerrarMenu() {
  this.menuAbierto = false;
}

  
}
