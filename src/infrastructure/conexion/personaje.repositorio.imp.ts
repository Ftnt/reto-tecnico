import { Injectable } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';
import { PersonajeDTO } from 'src/aplication/dtos/personaje.dto';

@Injectable()
export class PersonajeRepositorio {
  constructor(private readonly dynamoService: DynamoDBService) {}

  async obtenerPersonajePorId(id: string) {
    return this.dynamoService.getUserById(id);
  }

  async obtenerPersonajes() {
    return this.dynamoService.getAllUsers();
  }

  async crearPersonaje(personaje: PersonajeDTO) {
    return this.dynamoService.createUser(personaje);
  }
}
