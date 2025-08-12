import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PaqueteService, Paquete } from '../services/paquetes.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';


export interface Reserva {
  paqueteId: string;
  fecha: string;
  precio?: number;
}

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  //reservas: any[] = [];
  reservas: Reserva[] = [];
  paquetesMap: { [id: string]: Paquete } = {};

  constructor(private authService: AuthService, private paqueteService: PaqueteService,private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    //const usuario = this.authService.getUsuario() as { reservas: Reserva[], id: number, ... };
    if (usuario?.reservas?.length) {
      this.reservas = usuario.reservas;

      // Cargar info extra de cada paquete reservado
      this.reservas.forEach(reserva => {
        this.paqueteService.getPaquetePorId(reserva.paqueteId).subscribe(paquete => {
          this.paquetesMap[reserva.paqueteId] = paquete;
        });
      });
    }



  }

  getNombrePaquete(paqueteId: string): string {
    return this.paquetesMap[paqueteId]?.nombre || 'Cargando...';
  }


  cancelarReserva(index: number, reserva: Reserva): void {
    const confirmar = confirm("¿Estás seguro de cancelar esta reserva?");
    if (!confirmar) return;
  
    const usuario = this.authService.getUsuario();
    if (!usuario || !usuario.reservas) return;
  
    // 1. Quitar reserva del arreglo del usuario
    usuario.reservas = usuario.reservas.filter(
      (r: Reserva, i: number) => !(i === index && r.paqueteId === reserva.paqueteId && r.fecha === reserva.fecha)
    );
  
    // 2. Actualizar usuario en backend
    this.usuarioService.actualizarUsuario(usuario.id!, usuario).subscribe({
      next: () => {
        // 3. Actualizar localStorage y contador
        this.authService.actualizarUsuarioLocal(usuario);
        localStorage.setItem('user', JSON.stringify(usuario));
        this.authService.actualizarCantidadReservas();
  
        // 4. Actualizar vista
        this.reservas.splice(index, 1);
  
        alert('Reserva cancelada con éxito.');
      },
      error: err => {
        console.error('❌ Error al cancelar reserva', err);
        alert('Ocurrió un error al cancelar la reserva.');
      }
    });
  
    // 5. (Opcional) Actualizar el paquete para disminuir su contador de reservas
    this.paqueteService.getPaquetePorId(reserva.paqueteId).subscribe(paquete => {
      paquete.cantidadReservas = Math.max((paquete.cantidadReservas || 1) - 1, 0);
      this.paqueteService.actualizarPaquete(paquete.id, paquete).subscribe();
    });
  }
  
}
