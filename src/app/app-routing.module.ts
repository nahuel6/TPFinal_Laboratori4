import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';

const routes: Routes = [

    {path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },  
      { path: 'registro', component: RegistroComponent },  
    
      {path: 'destinations', component: DestinationsComponent}, 
    
   
   { path: '**', redirectTo: '/' }  // Redirige cualquier ruta desconocida a la landing page 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 


