import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetallePaquete {
  descripcionCompleta: string;
  lugarPartidaRegreso: string;
  horarioSalida: string;
  incluido: string[];
  noIncluido: string[];
  tarifas: { hotel: string; precio: number; }[];
  notas: string[];
}
export interface Itinerario {
  dia: string;
  descripcion: string;
}
export interface Alojamiento {
  hotel: string;
  categoria: number;
  single: string;
  doble: string;
  triple: string;
  validoHasta: Date;
}
export interface Paquete {
  id: string; // o number, depende de tu json
  nombre: string;
  descripcion: string;
  itinerario: Itinerario[];
  ubicacion: Ubicacion[];
  alojamientos: Alojamiento[];
  detalles?: DetallePaquete;
  cantidadReservas: number;
  fechasPrecios:{}[];
}
export interface Ubicacion {
  id: number;
  nombre: string;
  maps_url: string;
  link_externo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl = 'http://localhost:3000/paquetes';

  constructor(private http: HttpClient) {}

  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(this.apiUrl);
  }

  getPaquetePorId(id: string): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.apiUrl}/${id}`);
  }


  getFechasDisponiblesConPrecios(paquete: any): any[] {
    const eventos: any[] = [];
  
    paquete.fechasPrecios.forEach((fp: any) => {
      if (!fp.fecha || !fp.precio) return;
  
      eventos.push({
        title: `$${fp.precio}`,
        start: fp.fecha,
        extendedProps: {
          precio: fp.precio,
          paqueteId: paquete.id
        }
      });
    });
  
    return eventos;
  }

  actualizarPaquete(id: number, paquete: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paquete);
  }
  
  
}

