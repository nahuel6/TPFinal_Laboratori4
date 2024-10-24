import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;  // Para manejar el mensaje de éxito
  private apiUrl = 'http://localhost:3000/usuarios';  // URL del JSON server

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    const nuevoUsuario = this.registroForm.value;  // Obtenemos los valores del formulario

    // Verificar si el email ya está registrado
    this.http.get<Usuario[]>(this.apiUrl).subscribe(usuarios => {
      const usuarioExistente = usuarios.find(usuario => usuario.email === nuevoUsuario.email);

      if (usuarioExistente) {
        alert('El email ya está registrado. Por favor, utiliza otro email.');
      } else {
        // Registrar nuevo usuario
        this.http.post(this.apiUrl, nuevoUsuario).subscribe(() => {
          this.registroExitoso = true;  // Mostramos el mensaje de éxito
          this.registroForm.reset();    // Limpiamos el formulario
        });
      }
    });
  }

  // Método para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}