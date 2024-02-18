import { Module } from '@nestjs/common';
import { SubscribeSchoolStudentService } from './subscribeSchoolStudent.service';

@Module({
  imports: [],
  providers: [SubscribeSchoolStudentService],
  exports: [SubscribeSchoolStudentService],
})
export class SubscribeSchoolStudentModule {}
