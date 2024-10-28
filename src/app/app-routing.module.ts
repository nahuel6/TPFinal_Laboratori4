import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DestinationsComponent } from './destinations/destinations.component';

const routes: Routes = [
    
      { path: 'login', component: LoginComponent },  
      { path: 'registro', component: RegistroComponent },  
    
      {path: 'destinations', component: DestinationsComponent}, 
    
   
   { path: '**', redirectTo: '/destinations' }  // Redirige cualquier ruta desconocida a la landing page 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 


