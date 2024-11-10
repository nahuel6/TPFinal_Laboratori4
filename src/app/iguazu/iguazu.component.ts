import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iguazu',
  templateUrl: './iguazu.component.html',
  styleUrls: ['./iguazu.component.css']
})

export class IguazuComponent implements OnInit {
  // Propiedades para controlar la visibilidad de cada sección
  showingDetails: boolean = false;
  showingItinerary: boolean = false;
  showingLocation: boolean = false;
  showingAccommodation: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log("Paquetes component initialized");
  }

  // Métodos para mostrar cada sección al hacer clic en el botón correspondiente
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
