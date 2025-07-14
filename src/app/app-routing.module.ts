import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DestinationsComponent } from './destinations/destinations.component';

import { HomeComponent } from './components/pages/home/home.component';
import { Paquetes2ListComponent } from './components/pages/paquetes2-list/paquetes2-list.component';
import { Paquetes2DetalleComponent } from './components/pages/paquete-detalle/paquete-detalle.component';
import { AuthGuard } from './guards/auth.guard';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';

const routes: Routes = [

    {path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },  
      { path: 'registro', component: RegistroComponent },  
    
      {path: 'destinations', component: DestinationsComponent}, 
      {path: 'paquetes2',component: Paquetes2ListComponent},
      {path: 'paquetes2/:id',component: Paquetes2DetalleComponent},
      { path: 'mis-reservas', component: MisReservasComponent,canActivate: [AuthGuard] },
      /* ,canActivate: [AuthGuard] */ 
   
   { path: '**', redirectTo: '/' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



