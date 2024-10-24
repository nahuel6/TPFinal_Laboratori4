import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
    
      { path: 'login', component: LoginComponent },  // Ruta para login
      { path: 'registro', component: RegistroComponent },  // Ruta para registro
    
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirige al login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

