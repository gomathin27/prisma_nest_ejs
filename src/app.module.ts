import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './Profile/Profile.module';


@Module({
  imports: [ProfileModule,TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
