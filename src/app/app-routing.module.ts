import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { PaquetesComponent } from './paquetes/paquetes.component'; 
import { BuenosAiresComponent } from './buenos-aires/buenos-aires.component';
import { MendozaComponent } from './mendoza/mendoza.component';
import { CordobaComponent } from './cordoba/cordoba.component';
import { BarilocheComponent } from './bariloche/bariloche.component';
import { IguazuComponent } from './iguazu/iguazu.component';
import { SaltaComponent } from './salta/salta.component';
import { HomeComponent } from './components/pages/home/home.component';
import { Paquetes2ListComponent } from './components/pages/paquetes2-list/paquetes2-list.component';
import { Paquetes2DetalleComponent } from './components/pages/paquete-detalle/paquete-detalle.component';


const routes: Routes = [

    {path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },  
      { path: 'registro', component: RegistroComponent },  
    
      {path: 'destinations', component: DestinationsComponent}, 
      { path: 'paquetes', component: PaquetesComponent },
      { path: 'paquete/buenos-aires', component: BuenosAiresComponent },
      { path: 'paquete/mendoza', component: MendozaComponent},
      { path: 'paquete/cordoba', component: CordobaComponent},
      { path: 'paquete/bariloche', component: BarilocheComponent},
      { path: 'paquete/iguazu', component: IguazuComponent},
      { path: 'paquete/salta', component: SaltaComponent},
      {path: 'paquetes2',component: Paquetes2ListComponent},
      {path: 'paquetes2/:id',component: Paquetes2DetalleComponent},
    
   
   { path: '**', redirectTo: '/' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



