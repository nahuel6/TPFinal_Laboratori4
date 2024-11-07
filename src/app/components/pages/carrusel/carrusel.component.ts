import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  imagenes: string[] = [
    
   
    "assets/images/man-5983064_1280.jpg",
    'assets/images/lake-6476212_1280.jpg',
    'assets/images/bg4.jpg',
    'assets/images/bg6.jpg',
    'assets/images/img-10.jpg',
    'assets/images/img-11.jpg',
    'assets/images/img-12.jpg',
    'assets/images/img-13.jpg'
  ];
  imagenActiva: number = 0;
  intervalo: any;

  constructor() {}

  ngOnInit(): void {
    this.iniciarCarrusel();
  }

  iniciarCarrusel(): void {
    this.intervalo = setInterval(() => {
      this.imagenActiva = (this.imagenActiva + 1) % this.imagenes.length;
    }, 5000); 
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo); // Limpia el intervalo cuando se destruya el componente
    }
  }
}


