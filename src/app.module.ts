import { Module } from '@nestjs/common';
import { InfraestructuraModule } from './infrastructure/infrastructure.module';
import { PersonajeService } from './aplication/servicios/personajes.service';
import { SwapiService } from './infrastructure/swapi/swapi.service';
import { PersonajesController } from './infrastructure/controllers/personajes.controller';
import { SwapiModule } from './infrastructure/swapi/swapi.module';

@Module({
  imports: [InfraestructuraModule, SwapiModule],
  providers: [PersonajeService, SwapiService],
  controllers: [PersonajesController],
})
export class AppModule {}
