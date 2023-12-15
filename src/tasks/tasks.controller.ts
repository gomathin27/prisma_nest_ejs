import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

import * as fs from 'fs';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}


  @Post()
  async createCode(@Body() body): Promise<any> {
    //console.log('body', body);
    const myJSON = JSON.stringify(body);
   //  fs.writeFileSync('./views/test.json', myJSON);
    return await this.taskService.createCode(myJSON);
    
  }
}
