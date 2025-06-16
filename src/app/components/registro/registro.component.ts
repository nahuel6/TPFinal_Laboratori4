import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;
  mostrarPassword: boolean = false;
  mostrarConfirmPassword = false;
  

  constructor(private fb: FormBuilder, private router: Router, private usuarioService : UsuarioService) {
   
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required,Validators.maxLength(8),Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordsIgualesValidator }
  );
  }
  

togglePassword() {
  this.mostrarPassword = !this.mostrarPassword;
}
toggleConfirmPassword() {
  this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
}
  passwordsIgualesValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched(); // Marca los campos para mostrar errores
    return;
  }
    

    const nuevoUsuario = {
      ...this.registroForm.value,
      confirmPassword: undefined // No se envía al backend
    };
    /*const nuevoUsuario = this.registroForm.value;*/  
    
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      const usuarioExistente = usuarios.find(usuario => usuario.email === nuevoUsuario.email);
   

      if (usuarioExistente) {
        alert('El email ya está registrado. Por favor, utiliza otro email.');
      } else {
        
        this.usuarioService.registrarUsuario(nuevoUsuario).subscribe(() => {
          this.registroExitoso = true;
          this.registroForm.reset();
          this.router.navigate(['/login']);
        });
        
      }
    });
  }

  
  
}