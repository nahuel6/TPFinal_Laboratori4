import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  imagenes: string[] = [
    
    'assets/images/the-side-of-the-road-4259510_1280.jpg',
    "assets/images/man-5983064_1280.jpg",
    'assets/images/lake-6476212_1280.jpg'
  ];
  imagenActiva: number = 0;
  intervalo!: ReturnType<typeof setInterval>;

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
      clearInterval(this.intervalo); 
    }
  }
}


