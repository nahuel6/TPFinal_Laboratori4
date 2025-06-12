import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { CarruselComponent } from './components/pages/carrusel/carrusel.component';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { DestinationsComponent } from './destinations/destinations.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';

/*import { PaquetesComponent } from './paquetes/paquetes.component';
import { BuenosAiresComponent } from './buenos-aires/buenos-aires.component';
import { MendozaComponent } from './mendoza/mendoza.component';
import { CordobaComponent } from './cordoba/cordoba.component';
import { BarilocheComponent } from './bariloche/bariloche.component';
import { IguazuComponent } from './iguazu/iguazu.component';
import { SaltaComponent } from './salta/salta.component';*/
import { Paquetes2ListComponent } from './components/pages/paquetes2-list/paquetes2-list.component';
import { Paquetes2DetalleComponent } from './components/pages/paquete-detalle/paquete-detalle.component';
import { MapaPaqueteComponent } from './mapa-paquete/mapa-paquete.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    CarruselComponent,
    DestinationsComponent,
    ComentariosComponent,
    HomeComponent,
    NavbarComponent,
   /* PaquetesComponent,
    BuenosAiresComponent,
    MendozaComponent,
    CordobaComponent,
    BarilocheComponent,
    IguazuComponent,
    SaltaComponent,*/
    Paquetes2ListComponent,
    Paquetes2DetalleComponent,
    MapaPaqueteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
