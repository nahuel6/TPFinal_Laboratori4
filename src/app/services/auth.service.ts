import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';  // Importar la interfaz Usuario

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  
  constructor(private http: HttpClient) { }

  // Método para autenticar al usuario
  login(email: string, password: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  // Método para cerrar sesión
  logout() {
    // Eliminar token de sesión u otros mecanismos de logout
    localStorage.removeItem('user');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

