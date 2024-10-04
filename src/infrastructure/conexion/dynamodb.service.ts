import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
// import { fromIni } from '@aws-sdk/credential-providers';

const client = new DynamoDBClient({
  region: 'us-east-1',
  // credentials: fromIni({ profile: 'personal' }), // Perfil de AWS CLI para local
});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = process.env.PERSONAJES_TABLE as string; // Obtén el nombre de la tabla de la variable de entorno
console.log('tableName', tableName);

export class DynamoDBService {
  async getUserById(id: string): Promise<any> {
    const params = { TableName: tableName, Key: { id } };
    return dynamo.send(new GetCommand(params));
  }

  async getAllUsers(): Promise<any> {
    const params = { TableName: tableName };
    return dynamo.send(new ScanCommand(params));
  }

  async createUser(user: any): Promise<any> {
    if (!user.id) {
      user.id = uuidv4();
    }
    const params = { TableName: tableName, Item: user };
    try {
      await dynamo.send(new PutCommand(params));
      return {
        statusCode: 200,
        message: 'Usuario creado',
        id: user.id,
      };
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo crear el usuario');
    }
  }
}
