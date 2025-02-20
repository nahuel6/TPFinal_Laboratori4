
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  // Propiedades para controlar la visibilidad de cada sección
  showingDetails: boolean = false;
  showingItinerary: boolean = false;
  showingLocation: boolean = false;
  showingAccommodation: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log("Paquetes component initialized");
  }

  showDetails() {
    this.resetViews();
    this.showingDetails = true;
  }

  showItinerary() {
    this.resetViews();
    this.showingItinerary = true;
  }

  showLocation() {
    this.resetViews();
    this.showingLocation = true;
  }

  showAccommodation() {
    this.resetViews();
    this.showingAccommodation = true;
  }

  // Método para resetear todas las vistas a 'false'
  private resetViews() {
    this.showingDetails = false;
    this.showingItinerary = false;
    this.showingLocation = false;
    this.showingAccommodation = false;
  }
}
