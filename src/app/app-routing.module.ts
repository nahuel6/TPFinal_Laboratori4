import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { PaquetesComponent } from './paquetes/paquetes.component'; // Asegúrate de que esta importación coincida con la ubicación real de PaquetesComponent
import { BuenosAiresComponent } from './buenos-aires/buenos-aires.component';
import { MendozaComponent } from './mendoza/mendoza.component';
import { CordobaComponent } from './cordoba/cordoba.component';
import { BarilocheComponent } from './bariloche/bariloche.component';
import { IguazuComponent } from './iguazu/iguazu.component';
import { SaltaComponent } from './salta/salta.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: 'registro', component: RegistroComponent },  
  { path: 'destinations', component: DestinationsComponent },
  { path: 'paquetes', component: PaquetesComponent },
  { path: 'paquete/buenos-aires', component: BuenosAiresComponent },
  { path: 'paquete/mendoza', component: MendozaComponent},
  { path: 'paquete/cordoba', component: CordobaComponent},
  { path: 'paquete/bariloche', component: BarilocheComponent},
  { path: 'paquete/iguazu', component: IguazuComponent},
  { path: 'paquete/salta', component: SaltaComponent},

  
  { path: '**', redirectTo: '/destinations' }  // Redirige cualquier ruta desconocida a la página de destino
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



