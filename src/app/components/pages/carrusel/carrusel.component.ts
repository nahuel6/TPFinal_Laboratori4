import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  mostrarAside: boolean = true;
  imagenes: string[] = [
    
    'assets/images/the-side-of-the-road-4259510_1280.jpg',
    "assets/images/man-5983064_1280.jpg",
    'assets/images/lake-6476212_1280.jpg'
  ];
  paquetes = [
    {
      titulo: 'Bariloche 5 días',
      descripcion: 'Desde $150.000 - All Inclusive',
       ruta: '/paquetes2/1'
    },
    {
      titulo: 'Mendoza romántica',
      descripcion: '3 noches + visita a bodegas',
       ruta: '/paquetes2/3'
    },
    {
      titulo: 'Iguazú familiar',
      descripcion: '4 días con excursión a Cataratas',
      ruta: '/paquetes2/2'
    }
  ];
  
  indicePaquete = 0;
  imagenActiva: number = 0;
  intervalo!: ReturnType<typeof setInterval>;

  constructor(private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      const rutasOcultas = ['/paquetes', '/login', '/registro'];
      const rutaActual = event.urlAfterRedirects;
      this.mostrarAside = !rutasOcultas.some(ruta => rutaActual.startsWith(ruta));
    });
  }

  ngOnInit(): void {
    this.iniciarCarrusel();
    setInterval(() => this.siguientePaquete(), 4000);
  }

  iniciarCarrusel(): void {
    
    this.intervalo = setInterval(() => {
      this.imagenActiva = (this.imagenActiva + 1) % this.imagenes.length;
    }, 5000); 
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo); 
    }
  }

  get paqueteActual() {
    return this.paquetes[this.indicePaquete];
  }
  
  siguientePaquete() {
    this.indicePaquete = (this.indicePaquete + 1) % this.paquetes.length;
  }
  
  anteriorPaquete() {
    this.indicePaquete =
      (this.indicePaquete - 1 + this.paquetes.length) % this.paquetes.length;
  }

  irAlPaquete() {
    const ruta = this.paqueteActual?.ruta;
    if (ruta) {
      this.router.navigate([ruta]);
    }
  }

  mostrarModal: boolean = false;

abrirModal() {
  this.mostrarModal = true;
}

cerrarModal() {
  this.mostrarModal = false;
}

enviarFormulario() {
  // Por ahora solo cerramos el modal
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
  this.cerrarModal();
}

}


