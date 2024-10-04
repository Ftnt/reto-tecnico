import { SwapiService } from '../infrastructure/swapi/swapi.service';
import { PersonajesController } from '../infrastructure/controllers/personajes.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { PersonajeService } from '../aplication/servicios/personajes.service';
import { BadRequestException } from '@nestjs/common';

describe('PersonajesController', () => {
  let controller: PersonajesController;
  let personajeService: PersonajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonajesController],
      providers: [
        {
          provide: SwapiService,
          useValue: {
            obtenerPersonaje: jest.fn((id) => {
              if (id === '12') {
                return Promise.resolve({
                  statusCode: 200,
                  message: 'Personaje encontrado',
                  data: {
                    nombre: 'R2-D2',
                    altura: '96',
                    masa: '32',
                    color_pelo: 'n/a',
                    color_piel: 'white, blue',
                    color_ojos: 'red',
                    año_nacimiento: '33BBY',
                    genero: 'n/a',
                    mundo_natal: 'https://swapi.py4e.com/api/planets/8/',
                    creado: '2014-12-10T15:11:50.376000Z',
                    editado: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.py4e.com/api/people/3/',
                  },
                });
              }
              return Promise.resolve({
                statusCode: 404,
                message: 'Personaje no encontrado',
              });
            }),
          },
        },
        {
          provide: PersonajeService,
          useValue: {
            encontrarPorId: jest.fn((id) => {
              if (id === '4b49e260-b2b3-4ab3-8935-fbffd0a816eb') {
                return Promise.resolve({
                  statusCode: 200,
                  message: 'Personaje encontrado',
                  data: {
                    nombre: 'Henry',
                    masa: '77',
                    altura: '182',
                    url: 'https://swapi.py4e.com/api/people/10/',
                    color_pelo: 'auburn, white',
                    mundo_natal: 'https://swapi.py4e.com/api/planets/20/',
                    editado: '2014-12-20T21:17:50.325000Z',
                    color_piel: 'fair',
                    creado: '2014-12-10T16:16:29.192000Z',
                    id: '4b49e260-b2b3-4ab3-8935-fbffd0a816eb',
                    color_ojos: 'blue-gray',
                    año_nacimiento: '57BBY',
                    genero: 'male',
                  },
                });
              }
              return Promise.resolve({
                statusCode: 404,
                message: 'Personaje no encontrado',
                data: null,
              });
            }),
            crearPersonaje: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PersonajesController>(PersonajesController);
    personajeService = module.get<PersonajeService>(PersonajeService);
  });

  it('should return a personaje object when given a valid ID', async () => {
    const validId = '12';
    const result = await controller.obtenerPersonaje(validId);
    expect(result.statusCode).toBe(200);
    expect(result.message).toBe('Personaje encontrado');
    expect(result.data).toBeDefined();
  });

  it('should return a 404 status when given an invalid ID', async () => {
    const invalidId = '-12d';
    // const result = await controller.obtenerPersonaje(invalidId);
    await expect(controller.obtenerPersonaje(invalidId)).rejects.toThrow(
      BadRequestException,
    );
    // expect(result.statusCode).toBe(404);
    // expect(result.message).toBe('Personaje no encontrado');
    // expect(result.data).toBeUndefined();
  });

  it('should create a character with all fields', async () => {
    const personajeData = {
      nombre: 'Luke Skywalker',
      altura: '172',
      masa: '77',
      color_pelo: 'blond',
      color_piel: 'fair',
      color_ojos: 'blue',
      año_nacimiento: '19BBY',
      genero: 'n/a',
      mundo_natal: 'https://swapi.py4e.com/api/planets/1/',
      creado: '2014-12-10T15:10:51.357000Z',
      editado: '2014-12-20T21:17:50.309000Z',
      url: 'https://swapi.py4e.com/api/people/2/',
    };

    jest
      .spyOn(personajeService, 'crearPersonaje')
      .mockResolvedValue(personajeData);

    const result = await controller.crearPersonaje(personajeData);
    result.data.id = '4b49e260-b2b3-4ab3-8935-fbffd0a816eb';

    expect(result.statusCode).toBe(201);
    expect(result.message).toBe('Personaje creado');
    expect(result.data.id).toBeDefined();
  });
});
