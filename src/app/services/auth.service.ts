import { Injectable , NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';  
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private userKey = 'user';
  private timeoutId: any;
  private inactivityTime = 60000; // 1 minuto = 60.000 ms


  constructor(private http: HttpClient,private router: Router, private ngZone: NgZone) { 
    
  }



  private autenticado = new BehaviorSubject<boolean>(this.isAuthenticated());
  public autenticado$ = this.autenticado.asObservable();
  private userNameSource = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSource.asObservable();

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
            this.setupInactivityListener();
          } else {
            this.autenticado.next(false);
            observer.next(null);  
          }
          observer.complete();
        });
      });
    }
    private getUsuarioDesdeLocalStorage(): Usuario | null {
      const data = localStorage.getItem('user');
      if (!data) return null;
      
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    estaAutenticado(): boolean {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return user !== null && !!user.email;
      } catch {
        return false;
      }
    }
    getUserName(): string | null {
      return this.getUsuarioDesdeLocalStorage()?.nombre ?? null;
    }
    
    getUserId(): number | null {
      return this.getUsuarioDesdeLocalStorage()?.id ?? null;
    }

    private setupInactivityListener() {
      const events = ['mousemove', 'keydown', 'scroll', 'click'];
    
      this.ngZone.runOutsideAngular(() => {
        events.forEach(event => {
          window.addEventListener(event, () => this.resetTimer());
        });
      });
    
      this.resetTimer(); // inicializa el temporizador
    }
    
    private resetTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
          alert('Sesión cerrada por inactividad');
          this.router.navigate(['/login']);
        });
      }, this.inactivityTime);
    }

   
  logout() {
    
    localStorage.removeItem('user');
    this.autenticado.next(false);
    this.clearUserName(); // limpia el nombre del observable
    console.log("Usuario deslogueado");
    this.router.navigate(['/login']);
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  setUserName(name: string) {
    this.userNameSource.next(name);
  }

  clearUserName() {
    this.userNameSource.next(null);
  }
  public getUsuario(): Usuario | null {
    return this.getUsuarioDesdeLocalStorage();
  }
}

