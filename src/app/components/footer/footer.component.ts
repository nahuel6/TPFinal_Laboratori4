import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @ViewChild('formulario') formulario!:NgForm;
  mostrarModal: boolean = false;


constructor(private contactoService: ContactoService){


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