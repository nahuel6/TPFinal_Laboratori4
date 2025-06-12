import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteService, Paquete } from '../../../services/paquetes.service';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { Ubicacion } from '../../../services/paquetes.service';
@Component({
  selector: 'app-paquetes2-detalle',
  templateUrl: './paquete-detalle.component.html',
  styleUrls: ['./paquete-detalle.component.css']
})
export class Paquetes2DetalleComponent implements OnInit {
  paquete: any;
  activeTab: string = 'detalles';
  selectedUbicacion: Ubicacion | null = null;

  constructor(
    private route: ActivatedRoute,
    private paqueteService: PaqueteService,
    private sanitizer: DomSanitizer,
    
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paqueteService.getPaquetePorId(id).subscribe(data => {
        data.alojamientos = data.alojamientos.map((hotel: any) => ({
          ...hotel,
          valido_hasta: new Date(hotel.valido_hasta)
        }));
        this.paquete = data;
  
        // 👇 Asignar automáticamente si hay una sola ubicación
        if (this.paquete.ubicacion?.length === 1) {
          this.selectedUbicacion = this.paquete.ubicacion[0];
        }
      });
    }

    /*
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paqueteService.getPaquetePorId(id).subscribe(data => {
        data.alojamientos = data.alojamientos.map((hotel: any) => ({
          ...hotel,
          valido_hasta: new Date(hotel.valido_hasta)
        }));
        this.paquete = data;
      });
    }
      */
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
  generarEstrellas(cantidad: number): number[] {
    return Array(cantidad).fill(0);
  }
 
  getMapaSeguro(mapsUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
  }

  onUbicacionChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.selectedUbicacion = this.paquete.ubicacion.find((u: Ubicacion) => u.id === selectedId) || null;
  }

}
