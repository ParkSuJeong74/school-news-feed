import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestCreateSubscribeSchoolStudentDto } from './dto/requestSubscribeSchoolStudent.dto';
import {
  ResponseSubscribeSchoolNewsDto,
  ResponseSubscribeSchoolStudentDto,
} from './dto/responseSubscribeSchoolStudent.dto';
import { SubscribeSchoolStudentService } from './subscribeSchoolStudent.service';

@ApiTags('SubscribeSchoolStudent')
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
  async getSchoolList() {
    const schoolList =
      await this.subscribeSchoolStudentService.findSchoolList();
    return ResponseSubscribeSchoolStudentDto.fromInterfaces(schoolList);
  }

  @Delete()
  @ApiOperation({ summary: '7. 구독 중인 학교 페이지 구독 취소' })
  async delete(@Body() body: RequestCreateSubscribeSchoolStudentDto) {
    await this.subscribeSchoolStudentService.deleteSubscribe(body);
  }

  @Get('news/:studentId')
  @ApiOperation({ summary: '8. 구독 중인 학교 페이지별 소식 목록 조회' })
  async getNewsList(@Param('studentId') studentId: number) {
    // TODO: 로그인 개발
    const news =
      await this.subscribeSchoolStudentService.findNewsList(studentId);
    return ResponseSubscribeSchoolNewsDto.fromInterfaces(news);
  }
}
