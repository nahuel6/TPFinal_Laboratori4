import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteService, Paquete } from '../../../services/paquetes.service';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { Ubicacion } from '../../../services/paquetes.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import interactionPlugin from '@fullcalendar/interaction';
import { ViewEncapsulation } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';


@Component({
  selector: 'app-paquetes2-detalle',
  templateUrl: './paquete-detalle.component.html',
  styleUrls: ['./paquete-detalle.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('tabAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})

export class Paquetes2DetalleComponent implements OnInit {
  paquete: any;
  activeTab: string | null = null;
  selectedUbicacion: Ubicacion | null = null;
  fechaSeleccionada: { fecha: string, precio: number } | null = null;
reservaConfirmada: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private paqueteService: PaqueteService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
    private usuarioService : UsuarioService
    
  ) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,interactionPlugin],
    initialView: 'dayGridMonth',
    events: [], // se setea en ngOnInit
    height: 'auto',
    locale: 'es',
    eventClick: this.onEventClick.bind(this),
    
    dateClick: () => {
      // Si se hace clic en una fecha sin evento, se limpia la selección
      this.fechaSeleccionada = null;
      this.reservaConfirmada = false;
    }
      
  };

  ngOnInit(): void {

// Si venís de un login, recuperá el tab
const savedTab = localStorage.getItem('tabPostLogin');
if (savedTab) {
  this.activeTab = savedTab;
  localStorage.removeItem('tabPostLogin'); // Limpiar para que no quede persistente
} /*else {
 // this.activeTab = 'detalles'; // o el tab por defecto
}*/

// resto de tu lógica de inicialización

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paqueteService.getPaquetePorId(id).subscribe(data => {
        
        this.calendarOptions.events = this.paqueteService.getFechasDisponiblesConPrecios(data);
        data.alojamientos = data.alojamientos.map((hotel: any) => ({
          ...hotel,
          valido_hasta: new Date(hotel.valido_hasta)
        }));
        this.paquete = data;
  
        // 👇 Asignar automáticamente si hay una sola ubicación
        if (this.paquete.ubicacion?.length === 1) {
          this.selectedUbicacion = this.paquete.ubicacion[0];
        }
      });
    }

  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
  generarEstrellas(cantidad: number): number[] {
    return Array(cantidad).fill(0);
  }
 
  getMapaSeguro(mapsUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
  }

  onUbicacionChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.selectedUbicacion = this.paquete.ubicacion.find((u: Ubicacion) => u.id === selectedId) || null;
  }

  onEventClick(info: any): void {
    const fecha = info.event.startStr;
    const precio = info.event.extendedProps.precio;
  
    this.fechaSeleccionada = { fecha, precio };
    this.reservaConfirmada = false; // Reinicia si el usuario cambia de fecha
  }

  confirmarReserva(): void {
    if (!this.fechaSeleccionada || !this.paquete) return;
  
    const usuario = this.authService.getUsuario();
    if (!usuario) {
      alert("Debes iniciar sesión para reservar.");

       // ✅ Guardar ruta actual y pestaña activa antes de redirigir
    const currentUrl = this.router.url;
    localStorage.setItem('rutaPostLogin', currentUrl);
    localStorage.setItem('tabPostLogin', 'fechasPrecios'); // o el nombre de tu pestaña

      this.router.navigate(['/login']);
      
      return;
    }
  
    // Agregar reserva al usuario
    usuario.reservas = usuario.reservas || [];
    usuario.reservas.push({
      paqueteId: this.paquete.id,
      fecha: this.fechaSeleccionada.fecha,
      precio: this.fechaSeleccionada.precio
    });
  
    if (usuario.id !== undefined) {
      this.usuarioService.actualizarUsuario(usuario.id, usuario).subscribe(() => {
        console.log("Reserva guardada en usuario");
      });
    } else {
      console.error('El ID del usuario es undefined.');
      return;
    }
  
    // Incrementar contador de reservas en el paquete
    this.paquete.cantidadReservas = (this.paquete.cantidadReservas || 0) + 1;
    this.paqueteService.actualizarPaquete(this.paquete.id, this.paquete).subscribe(() => {
      this.reservaConfirmada = true;
      console.log("Reserva guardada en paquete");
    });
  }


}
