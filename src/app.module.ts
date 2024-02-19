import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './module/auth/auth.controller';
import { NewsController } from './module/news/news.controller';
import { NewsModule } from './module/news/news.module';
import { NewsFeedController } from './module/newsFeed/newsFeed.controller';
import { NewsFeedModule } from './module/newsFeed/newsFeed.module';
import { SchoolController } from './module/school/school.controller';
import { SchoolModule } from './module/school/school.module';
import { SchoolAdminController } from './module/schoolAdmin/schoolAdmin.controller';
import { SchoolAdminModule } from './module/schoolAdmin/schoolAdmin.module';
import { StudentController } from './module/student/student.controller';
import { StudentModule } from './module/student/student.module';
import { SubscribeSchoolStudentController } from './module/subscribeSchoolStudent/subscribeSchoolStudent.controller';
import { SubscribeSchoolStudentModule } from './module/subscribeSchoolStudent/subscribeSchoolStudent.module';

@Module({
  imports: [
    SchoolModule,
    NewsModule,
    SchoolAdminModule,
    StudentModule,
    SubscribeSchoolStudentModule,
    NewsFeedModule,
    JwtModule,
  ],
  controllers: [
    AppController,
    StudentController,
    SchoolAdminController,
    SchoolController,
    NewsController,
    SubscribeSchoolStudentController,
    NewsFeedController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
