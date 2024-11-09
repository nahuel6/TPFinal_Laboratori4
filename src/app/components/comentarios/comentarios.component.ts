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
    private authService: AuthService,
    private http: HttpClient
    
  ) {}

  ngOnInit(): void {
    this.obtenerComentarios();
    this.obtenerUsuarios();
    
    this.authService.autenticado$.subscribe((estado) => {
      this.usuarioLogueado = estado;
      console.log("Estado de usuarioLogueado actualizado:", this.usuarioLogueado);  // Debería reflejar el cambio
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
    if (this.nuevoComentario.trim() && this.usuarioLogueado) { // Asegúrate de que el usuario esté logueado
      const comentario: Comentario = {
        userId: this.authService.getUserId()?? 0, // Obtener ID del usuario logueado
        destinationId: this.destinationId,
        content: this.nuevoComentario,
        nombreUsuario: this.authService.getUserName()|| "", // Asigna el nombre de usuario
        
      };

      // Enviar el comentario a la API
      this.http.post('http://localhost:3000/comentarios', comentario).subscribe(() => {
        this.comentarios.push(comentario); // Agregar comentario a la lista
        this.nuevoComentario = '';         // Limpiar el campo de texto
      });
    }
  }
/*
agregarComentario(): void {
  if (this.nuevoComentario.trim()) {
    const comentario = {
      userId: this.usuarioLogueado?.id,
      destinationId: this.destinationId,
      content: this.nuevoComentario
    };

    this.http.post<Comentario>('http://localhost:3000/comentarios', comentario).subscribe((data) => {
      
      this.comentarios.push({
        ...data,
        nombreUsuario: this.usuarioLogueado?.nombre || 'Usuario desconocido'
      });
      this.nuevoComentario = ''; 
    });
  }
}*/
 }