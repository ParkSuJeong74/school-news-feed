import { Module } from '@nestjs/common';
import { StudentService } from './student.service';

@Module({
  imports: [],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
