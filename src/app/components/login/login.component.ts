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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Usa el servicio de autenticación
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Llama al método de login en el AuthService
    this.authService.login(email, password).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log('Login exitoso:', usuario);
          this.router.navigate(['/destinations']); // Redirige al usuario
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
/*
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  private apiUrl = 'http://localhost:3000/usuarios';  
  loginFailed: boolean = false;


  
  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    
  }
  onLogin() {
    const email = this.loginForm.get('email')?.value;
    

    this.http.get<Usuario[]>(this.apiUrl).subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

      if (usuarioEncontrado) {
        
        console.log('Login exitoso');
        this.router.navigate(['/destinations']);
        
        localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
        this.loginFailed = false;
      } else {
        console.log('Credenciales incorrectas');
        this.loginFailed = true;
      }
    });
  }
  
  goToRegister(): void {
    this.router.navigate(['/registro']); 
  }
}
*/