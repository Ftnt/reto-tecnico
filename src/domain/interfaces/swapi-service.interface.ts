import {
  PersonajeDTO,
  ErrorRespuesta,
} from '../../aplication/dtos/personaje.dto';

export interface ISwapiService {
  obtenerPersonaje(id: string): Promise<PersonajeDTO | ErrorRespuesta>;
}
