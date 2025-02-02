import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  private apiUrl = 'http://localhost:3000/usuarios';  // Tu JSON server API
  loginFailed: boolean = false;


  
  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    

    this.http.get<Usuario[]>(this.apiUrl).subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

      if (usuarioEncontrado) {
        console.log('Login exitoso');
        // Puedes guardar el usuario en localStorage o manejar el estado de autenticación aquí
        localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
        this.loginFailed = false;
      } else {
        console.log('Credenciales incorrectas');
        this.loginFailed = true;
      }
    });
  }
  goToRegister(): void {
    this.router.navigate(['/registro']); // Redirigir al formulario de registro
  }
}
