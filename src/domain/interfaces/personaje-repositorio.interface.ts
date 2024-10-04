import { Personaje } from '../entidad/personaje.entity';

export interface IPersonajeRepositorio {
  obtenerPersonajes(): Promise<Personaje[]>;
  obtenerPersonaje(id: number): Promise<Personaje>;
  crearPersonaje(personaje: Personaje): Promise<Personaje>;
}
