import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Comentario {
  id?: number;
  userId: number;
  destinationId: string;
  content: string;
  nombreUsuario?: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private comentariosUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient) {}

   getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.comentariosUrl);
  }

  getComentariosPorDestino(destinationId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.comentariosUrl}?destinationId=${destinationId}`);
  }

/*
  getComentariosPorDestino(destinationId: string): Observable<Comentario[]> {
    return this.getComentarios().pipe(
      map(comentarios => comentarios.filter(comentario => comentario.destinationId === destinationId))
    );
  }
*/

  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.comentariosUrl, comentario);
  }

  eliminarComentario(id: number): Observable<any> {
    return this.http.delete(`${this.comentariosUrl}/${id}`);
  }

}
