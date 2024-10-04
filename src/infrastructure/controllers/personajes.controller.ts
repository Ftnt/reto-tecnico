import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { SwapiService } from '../swapi/swapi.service';
import { PersonajeService } from '../../aplication/servicios/personajes.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrearPersonajeDTO } from '../../aplication/dtos/personaje.dto';

@Controller('personajes')
@ApiTags('Personajes')
export class PersonajesController {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly personajesService: PersonajeService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un personaje por ID' })
  async obtenerPersonaje(@Param('id') id: string) {
    let result: any = '';
    try {
      result = await this.swapiService.obtenerPersonaje(id);
    } catch (error) {
      throw new Error(error);
    }

    if (result.statusCode === 404) {
      try {
        const localPersonaje = await this.personajesService.encontrarPorId(id);
        result = localPersonaje?.Item;
      } catch (error) {
        throw new Error(error);
      }
    }

    if (!result) {
      throw new BadRequestException('No se encontró el personaje');
    }

    return {
      statusCode: 200,
      message: 'Personaje encontrado',
      data: result,
    };
  }

  @ApiOperation({ summary: 'Crea un nuevo personaje' })
  @ApiBody({ type: CrearPersonajeDTO })
  @Post()
  @HttpCode(201)
  async crearPersonaje(@Body() data: CrearPersonajeDTO) {
    try {
      const personajeCreado = await this.personajesService.crearPersonaje(data);

      const id = personajeCreado.id;

      return {
        statusCode: 201,
        message: 'Personaje creado',
        data: {
          id,
        },
      };
    } catch (error) {
      throw new BadRequestException('No se pudo crear el personaje', error);
    }
  }
}
