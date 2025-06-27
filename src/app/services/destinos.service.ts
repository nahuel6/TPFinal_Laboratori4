import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface DestinoDescripcion {
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinosService {
  private jsonUrl = 'http://localhost:3000/destinos';
  constructor(private http: HttpClient) { }


  getDescripcion(nombreDestino: string): Observable<string> {
    return this.http.get<DestinoDescripcion[]>(this.jsonUrl).pipe(
      map(destinos => {
        const destino = destinos.find(d => d.nombre === nombreDestino);
        return destino ? destino.descripcion : 'Descubre los mejores destinos turísticos en Argentina.';
      })
    );
  }

}
