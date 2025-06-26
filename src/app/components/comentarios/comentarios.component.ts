import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ComentariosService, Comentario } from '../../services/comentarios.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit, OnChanges, OnDestroy {
  @Input() destinationId!: string;

  comentarios: Comentario[] = [];
  usuarios: Usuario[] = [];
  nuevoComentario: string = '';
  usuarioLogueado: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private comentariosService: ComentariosService,
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private router: Router
  ) {}

  goToLogin(): void {
    // Guarda la ruta actual para volver después del login
    localStorage.setItem('rutaPostLogin', this.router.url);
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.obtenerComentarios();
    this.obtenerUsuarios();

    this.authSubscription = this.authService.autenticado$.subscribe((estado) => {
      this.usuarioLogueado = estado;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destinationId'] && !changes['destinationId'].firstChange) {
      this.obtenerComentarios();
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  obtenerComentarios(): void {
    this.comentariosService.getComentariosPorDestino(this.destinationId).subscribe((data) => {
      this.comentarios = data;
      this.combinarComentariosConUsuarios();
    });
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.combinarComentariosConUsuarios();
    });
  }

  combinarComentariosConUsuarios(): void {
    if (this.comentarios.length && this.usuarios.length) {
      this.comentarios = this.comentarios.map((comentario) => {
        const usuario = this.usuarios.find((u) => u.id === comentario.userId);
        return {
          ...comentario,
          nombreUsuario: usuario ? usuario.nombre : 'Usuario desconocido',
        };
      });
    }
  }

  agregarComentario(): void {
    const comentarioLimpio = this.nuevoComentario.trim();
    if (!comentarioLimpio || !this.usuarioLogueado) return;

    const nuevo: Comentario = {
      userId: this.authService.getUserId() ?? 0,
      destinationId: this.destinationId,
      content: comentarioLimpio,
      nombreUsuario: this.authService.getUserName() || '',
      fecha: new Date().toISOString()
    };

    this.comentariosService.agregarComentario(nuevo).subscribe((comentarioCreado) => {
      this.comentarios.push(comentarioCreado);
      this.nuevoComentario = '';
    });
  }

  eliminarComentario(comentario: Comentario): void {
    if (!comentario.id) return;

    const confirmar = confirm('¿Estás seguro de que deseas eliminar este comentario?');
    if (!confirmar) return;

    this.comentariosService.eliminarComentario(comentario.id).subscribe(() => {
      this.comentarios = this.comentarios.filter(c => c.id !== comentario.id);
    });
  }
}
/*
import { Component, Input, OnInit ,OnDestroy, OnChanges,SimpleChanges} from '@angular/core';
import { ComentariosService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';
import { Comentario } from '../../services/comentarios.service';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit, OnChanges, OnDestroy {
  @Input() destinationId!: string;
  comentarios: Comentario[] = [];
  usuarios: Usuario[] = [];
  datosCargados: boolean = true;
  nuevoComentario: string = ''; 
  
  usuarioLogueado: boolean = false;
  private authSubscription: Subscription = new Subscription();
  constructor(
    private comentariosService: ComentariosService,
    public authService: AuthService,
    private http: HttpClient
    
  ) {}

  ngOnInit(): void {
    this.obtenerComentarios();
    this.obtenerUsuarios();
    
    this.authService.autenticado$.subscribe((estado) => {
      this.usuarioLogueado = estado;
      console.log("Estado de usuarioLogueado actualizado:", this.usuarioLogueado);  
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destinationId'] && !changes['destinationId'].firstChange) {
      this.obtenerComentarios(); 
    }
  }
  ngOnDestroy(): void {
    
    this.authSubscription.unsubscribe();
  }
  
  obtenerComentarios(): void {
    this.http
      .get<Comentario[]>(`http://localhost:3000/comentarios?destinationId=${this.destinationId}`)
      .subscribe((data) => {
        this.comentarios = data;
        this.combinarComentariosConUsuarios();
      });
  }

  obtenerUsuarios(): void {
    this.http.get<Usuario[]>('http://localhost:3000/usuarios').subscribe((data) => {
      this.usuarios = data;
      this.combinarComentariosConUsuarios();
    });
  }

  combinarComentariosConUsuarios(): void {
    if (this.comentarios.length && this.usuarios.length) {
      this.comentarios = this.comentarios.map((comentario) => {
        const usuario = this.usuarios.find((u) => u.id === comentario.userId);
        return {
          ...comentario,
          nombreUsuario: usuario ? usuario.nombre : 'Usuario desconocido',
        };
      });
      console.log('Comentarios con nombres:', this.comentarios);
    }
  }
  agregarComentario(): void {
    const comentarioLimpio = this.nuevoComentario.trim();
    if (!comentarioLimpio || !this.usuarioLogueado) return;
  
    const comentario: Comentario = {
      userId: this.authService.getUserId() ?? 0,
      destinationId: this.destinationId,
      content: comentarioLimpio,
      nombreUsuario: this.authService.getUserName() || "",
      //fecha: new Date().toISOString()
    };
  
    this.http.post('http://localhost:3000/comentarios', comentario).subscribe(() => {
      this.comentarios.push(comentario);
      this.nuevoComentario = '';
    });
  }

  eliminarComentario(comentario: Comentario): void {
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar este comentario?`);
    if (!confirmar) return;
  
    this.http.delete(`http://localhost:3000/comentarios/${comentario.id}`).subscribe(() => {
      // Filtrar el comentario eliminado del array local
      this.comentarios = this.comentarios.filter(c => c.id !== comentario.id);
    });
  }

 }
  */