import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentId } from '@src/decorator/auth.decorator';
import { StudentJwtAuthGuard } from '../auth/auth.guard';
import { RequestCreateSubscribeSchoolStudentDto } from './dto/requestSubscribeSchoolStudent.dto';
import {
  ResponseSubscribeSchoolNewsDto,
  ResponseSubscribeSchoolStudentDto,
} from './dto/responseSubscribeSchoolStudent.dto';
import { SubscribeSchoolStudentService } from './subscribeSchoolStudent.service';

@ApiTags('SubscribeSchoolStudent')
@UseGuards(StudentJwtAuthGuard)
@Controller('subscribe/schools')
export class SubscribeSchoolStudentController {
  constructor(
    private readonly subscribeSchoolStudentService: SubscribeSchoolStudentService,
  ) {}

  @Post()
  @ApiOperation({ summary: '5. 학교 페이지 구독' })
  async create(@Body() body: RequestCreateSubscribeSchoolStudentDto) {
    await this.subscribeSchoolStudentService.createSubscribe(body);
  }

  @Get()
  @ApiOperation({ summary: '6. 구독 중인 학교 페이지 목록 조회' })
  async getSchoolList(@StudentId() studentId: number) {
    const schoolList =
      await this.subscribeSchoolStudentService.findSchoolList(studentId);
    return ResponseSubscribeSchoolStudentDto.fromInterfaces(schoolList);
  }

  @Delete()
  @ApiOperation({ summary: '7. 구독 중인 학교 페이지 구독 취소' })
  async delete(@Body() body: RequestCreateSubscribeSchoolStudentDto) {
    await this.subscribeSchoolStudentService.deleteSubscribe(body);
  }

  @Get('news')
  @ApiOperation({ summary: '8. 구독 중인 학교 페이지별 소식 목록 조회' })
  async getNewsList(@StudentId() studentId: number) {
    const news =
      await this.subscribeSchoolStudentService.findNewsList(studentId);
    return ResponseSubscribeSchoolNewsDto.fromInterfaces(news);
  }
}
