import { Component, Input, OnInit } from '@angular/core';
import { ComentariosService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';
import { Comentario } from '../../services/comentarios.service';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() destinationId!: string;
  comentarios: Comentario[] = [];
  usuarios: Usuario[] = [];
  datosCargados: boolean = false;

  constructor(
    private comentariosService: ComentariosService,
    private authService: AuthService,private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerComentarios();
    this.obtenerUsuarios();
     
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
}
