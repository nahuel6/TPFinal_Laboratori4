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

  
  login(email: string, password: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  
  logout() {
    // Eliminar token de sesión u otros mecanismos de logout
    localStorage.removeItem('user');
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

