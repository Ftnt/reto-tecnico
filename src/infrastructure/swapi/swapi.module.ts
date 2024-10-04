// src/infraestructura/swapi/swapi.module.ts
import { Module } from '@nestjs/common';
import { SwapiClient } from './swapi.client';

@Module({
  providers: [SwapiClient],
  exports: [SwapiClient],
})
export class SwapiModule {}
