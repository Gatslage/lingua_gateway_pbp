import { Module } from '@nestjs/common';
import { LearningController } from './learning.controller';
import { LearningService } from './learning.service';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [TeachersModule, CoursesModule],
  controllers: [LearningController],
  providers: [LearningService],
})
export class LearningModule {}
