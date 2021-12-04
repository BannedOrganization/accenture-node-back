import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import configuration from 'config/configuration';
import { Get } from '@nestjs/common';

@Controller()
export class RecognitorsController {
  constructor() {
    ml_host: configuration().ml_host;
  }

  @Post('recognitors/car_number')
  @UseInterceptors(FileInterceptor('file'))
  async sendData(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body);

    return { status: true };
  }

  @Get('recognitors')
  async test() {
    return 'test';
  }
}
