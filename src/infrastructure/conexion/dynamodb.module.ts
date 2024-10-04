import { Module, Global } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Global()
@Module({
  providers: [
    {
      provide: 'DynamoDB',
      useValue: new DynamoDBClient({
        region: 'us-east-1',
      }),
    },
  ],
  exports: ['DynamoDB'],
})
export class DynamoDBModule {}
