import { Injectable } from '@nestjs/common';
import { SwapiClient } from './swapi.client';
import { PersonajeTransformador } from '../../utils/personaje-transformador';
import { ISwapiService } from '../../domain/interfaces/swapi-service.interface';
import {
  PersonajeDTO,
  ErrorRespuesta,
} from '../../aplication/dtos/personaje.dto';

@Injectable()
export class SwapiService implements ISwapiService {
  private transformador: PersonajeTransformador = new PersonajeTransformador();
  constructor(private readonly swapiClient: SwapiClient) {}
  async obtenerPersonaje(id: string): Promise<PersonajeDTO | ErrorRespuesta> {
    try {
      const respuesta = await this.swapiClient.getPersonaje(id);
      return this.transformador.transformar(respuesta.data);
    } catch (error) {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
  }
}
