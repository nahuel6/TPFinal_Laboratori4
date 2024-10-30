import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  
  constructor(private http: HttpClient) { }

  
  /*login(email: string, password: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }*/

    login(email: string, password: string): Observable<Usuario | null> {
      return new Observable((observer) => {
        this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`).subscribe((usuarios) => {
          const usuario = usuarios[0];
          if (usuario) {
            localStorage.setItem('user', JSON.stringify(usuario));
            observer.next(usuario);
          } else {
            observer.next(null);  // Usuario no encontrado
          }
          observer.complete();
        });
      });
    }
    getUserName(): string | null {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.nombre ? user.nombre : null;
      /*
      const user = localStorage.getItem('user') ;
      return user ? JSON.parse(user).nombre : null;  // Asumiendo que 'name' es el atributo del nombre
      */
    }

  logout() {
    // Eliminar token de sesión u otros mecanismos de logout
    localStorage.removeItem('user');
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

