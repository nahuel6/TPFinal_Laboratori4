import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  
  constructor(private http: HttpClient) { }

  private autenticado = new BehaviorSubject<boolean>(this.isAuthenticated());
  public autenticado$ = this.autenticado.asObservable();

    login(email: string, password: string): Observable<Usuario | null> {
      return new Observable((observer) => {
        this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`).subscribe((usuarios) => {
          const usuario = usuarios[0];
          if (usuario) {
            //this.usuarioLogueado = usuario;
            localStorage.setItem('user', JSON.stringify(usuario));
            this.autenticado.next(true);
            console.log("Usuario logueado:", usuario);
            observer.next(usuario);
          } else {
            this.autenticado.next(false);
            observer.next(null);  
          }
          observer.complete();
        });
      });
    }
    getUserName(): string | null {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.nombre ? user.nombre : null;
      
    }
    getUserId(): number | null {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user && user.id ? user.id : null;
    }
  logout() {
    // Eliminar token de sesión u otros mecanismos de logout
    localStorage.removeItem('user');
    
    this.autenticado.next(false);
    console.log("Usuario deslogueado");
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  
}

