import { Reserva } from "../mis-reservas/mis-reservas.component";

export interface Usuario {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  id?: number;
  rol: string;
  reservas: Reserva[]; 
  //reservas:{}[]; 
}
