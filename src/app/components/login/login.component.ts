import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rutaDestino = localStorage.getItem('rutaPostLogin') || '/';
    
    this.authService.login(email, password).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log('Login exitoso:', usuario);
          this.authService.setUserName(usuario.nombre);
          //this.router.navigate(['/']); 
          localStorage.removeItem('rutaPostLogin');
          this.router.navigate([rutaDestino]);
          this.loginFailed = false;
        } else {
          console.log('Credenciales incorrectas');
          this.loginFailed = true;
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.loginFailed = true;
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/registro']);
  }
}
