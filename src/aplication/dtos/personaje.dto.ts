import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
export class PersonajeDTO {
  nombre: string;
  altura: string;
  masa: string;
  color_pelo: string;
  color_piel: string;
  color_ojos: string;
  año_nacimiento: string;
  genero: string;
  mundo_natal: string;
  creado: string;
  editado: string;
  url: string;
}

export class ErrorRespuesta {
  statusCode: number;
  message: string;
}

export class CrearPersonajeDTO {
  @IsString()
  @Length(1, 255)
  @ApiProperty({ required: true })
  nombre: string;

  @IsString()
  @ApiProperty()
  altura: string;

  @IsString()
  @ApiProperty()
  masa: string;

  @IsString()
  @ApiProperty()
  color_pelo: string;

  @IsString()
  @ApiProperty()
  color_piel: string;

  @IsString()
  @ApiProperty()
  color_ojos: string;

  @IsString()
  @ApiProperty()
  año_nacimiento: string;

  @IsString()
  @ApiProperty()
  genero: string;
}
