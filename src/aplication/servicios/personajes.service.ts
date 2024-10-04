import { Injectable } from '@nestjs/common';
import { PersonajeRepositorio } from '../../infrastructure/conexion/personaje.repositorio.imp';
import { Personaje } from 'src/domain/entidad/personaje.entity';

@Injectable()
export class PersonajeService {
  constructor(private readonly personajeRepositorio: PersonajeRepositorio) {}

  async crearPersonaje(personaje: any): Promise<Personaje> {
    return this.personajeRepositorio.crearPersonaje(personaje);
  }

  async encontrarTodos(): Promise<Personaje[]> {
    return this.personajeRepositorio.obtenerPersonajes();
  }

  async encontrarPorId(id: string): Promise<Personaje> {
    return this.personajeRepositorio.obtenerPersonajePorId(id);
  }
}
