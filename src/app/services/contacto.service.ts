import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MensajeContacto {
  id?: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})


export class ContactoService {

  private apiUrl = 'http://localhost:3000/mensajesContacto';

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: MensajeContacto): Observable<MensajeContacto> {
    return this.http.post<MensajeContacto>(this.apiUrl, mensaje);
  }

  obtenerMensajes(): Observable<MensajeContacto[]> {
    return this.http.get<MensajeContacto[]>(this.apiUrl);
  }
}
