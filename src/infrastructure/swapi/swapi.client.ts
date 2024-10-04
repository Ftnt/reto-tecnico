import axios from 'axios';
import { SWAPI_BASE_URL } from '../../config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SwapiClient {
  async getPersonaje(id: string) {
    return await axios.get(`${SWAPI_BASE_URL}/people/${id}/`);
  }
}
