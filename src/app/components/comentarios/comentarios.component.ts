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
