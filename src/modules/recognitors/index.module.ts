import { Module } from '@nestjs/common';
import { RecognitorsController } from './index.controller';

@Module({
  imports: [],
  controllers: [RecognitorsController],
  providers: [],
  exports: [],
})
export class RecognitorsModule {}
