export interface Usuario {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  id?: number;
  rol: string;
  reservas:{}[]; 
}
