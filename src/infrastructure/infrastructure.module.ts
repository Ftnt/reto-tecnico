import { Module } from '@nestjs/common';
import { PersonajeRepositorio } from './conexion/personaje.repositorio.imp';
import { DynamoDBService } from './conexion/dynamodb.service';

@Module({
  providers: [DynamoDBService, PersonajeRepositorio],
  exports: [PersonajeRepositorio],
})
export class InfraestructuraModule {}
