import { Component, OnInit } from '@angular/core';
import { DestinationsService } from '../services/destinations.service';
import { UnsplashImage, UnsplashResponse } from '../models/unsplash-response.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DestinoDescripcion, DestinosService } from '../services/destinos.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent{
  imageUrls: string[] = []; 
  description: string = ''; 
  loading : boolean = false;
 
  showComments: boolean = false;
  selectedDestinationId: string = '';
  constructor(private destinationsService: DestinationsService,
     private router: Router,
     private authService: AuthService,
      private destinosService: DestinosService
      
    ) {}



  fetchImage(destination: string) {
    // Actualiza la descripción según el destino seleccionado
    this.loading = true;
    this.setDescription(destination);

    this.destinationsService.getImages(destination).subscribe(
      (response: UnsplashResponse) => {
        
        this.imageUrls = response.results.slice(0, 9).map((result: UnsplashImage) => result.urls.regular);
        this.loading = false;
      },
      (error: UnsplashResponse) => {
        console.error('Error fetching images:', error);
        this.loading = false;
        this.imageUrls = []; 
      }
    );
    this.selectedDestinationId = this.getDestinationIdByName(destination);
  }

  getDestinationIdByName(destinationName: string): string {
   
    const destinationMap: { [key: string]: string } = {
      'Buenos Aires Capital Federal': '1',
      'Mendoza': '2',
      'Córdoba Argentina': '3',
      'Bariloche Cerro Campanario': '4',
      'Iguazú': '5',
      'Salta Argentina': '6'
    };

    return destinationMap[destinationName] || '';
  }

  setDescription(destination: string) {
    this.destinosService.getDescripcion(destination).subscribe(desc => {
      this.description = desc;
    });


  }
}

