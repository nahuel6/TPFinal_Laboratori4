import { Component, OnInit, viewChild } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ContactoService, MensajeContacto } from '../../../services/contacto.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  @ViewChild('formulario') formulario!:NgForm;
  mostrarAside: boolean = true;
  imagenes: string[] = [
    
    'assets/images/the-side-of-the-road-4259510_1280.jpg',
    "assets/images/man-5983064_1280.jpg",
    'assets/images/lake-6476212_1280.jpg'
  ];
  paquetes = [
    {
      titulo: 'Bariloche 5 días',
      descripcion: 'Desde $150.000 - All Inclusive',
       ruta: '/paquetes2/1'
    },
    {
      titulo: 'Mendoza romántica',
      descripcion: '3 noches + visita a bodegas',
       ruta: '/paquetes2/3'
    },
    {
      titulo: 'Iguazú familiar',
      descripcion: '4 días con excursión a Cataratas',
      ruta: '/paquetes2/2'
    }
  ];
  
  indicePaquete = 0;
  imagenActiva: number = 0;
  intervalo!: ReturnType<typeof setInterval>;
  mostrarModal: boolean = false;

  constructor(private router: Router,private contactoService: ContactoService) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      const rutasOcultas = ['/paquetes', '/login', '/registro'];
      const rutaActual = event.urlAfterRedirects;
      this.mostrarAside = !rutasOcultas.some(ruta => rutaActual.startsWith(ruta));
    });
  }

  ngOnInit(): void {
    this.iniciarCarrusel();
    setInterval(() => this.siguientePaquete(), 4000);
  }

  iniciarCarrusel(): void {
    
    this.intervalo = setInterval(() => {
      this.imagenActiva = (this.imagenActiva + 1) % this.imagenes.length;
    }, 5000); 
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo); 
    }
  }

  get paqueteActual() {
    return this.paquetes[this.indicePaquete];
  }
  
  siguientePaquete() {
    this.indicePaquete = (this.indicePaquete + 1) % this.paquetes.length;
  }
  
  anteriorPaquete() {
    this.indicePaquete =
      (this.indicePaquete - 1 + this.paquetes.length) % this.paquetes.length;
  }

  irAlPaquete() {
    const ruta = this.paqueteActual?.ruta;
    if (ruta) {
      this.router.navigate([ruta]);
    }
  }

 

abrirModal() {
  console.log("Abriendo modal...");
  this.mostrarModal = true;
}

cerrarModal() {
  this.mostrarModal = false;
}

enviarFormulario(formulario: NgForm) {
  console.log('formulario:', formulario);
  console.log('email errors:', formulario.controls['email']?.errors);
  if (formulario.invalid) {
    console.warn('Formulario inválido');
    return;
  }
  const mensaje = {
    nombre: formulario.value.nombre,
    email: formulario.value.email,
    asunto: formulario.value.asunto,
    mensaje: formulario.value.mensaje
  };

  this.contactoService.enviarMensaje(mensaje).subscribe({
    next: () => {
      alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
      this.formulario.resetForm();
      this.cerrarModal();
    },
    error: (err) => {
      console.error("Error al enviar el mensaje", err);
      alert("Ocurrió un error al guardar tu mensaje.");
    }
  });
}

}
