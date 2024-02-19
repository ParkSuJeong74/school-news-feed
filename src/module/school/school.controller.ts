import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchoolAdminId } from '@src/decorator/auth.decorator';
import { SchoolAdminJwtAuthGuard } from '../auth/auth.guard';
import { RequestCreateSchoolDto } from './dto/requestSchool.dto';
import { ResponseSchoolDto } from './dto/responseSchool.dto';
import { SchoolService } from './school.service';

@ApiTags('School')
@UseGuards(SchoolAdminJwtAuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: '1. 학교 페이지 생성' })
  async create(
    @SchoolAdminId() schoolAdminId: number,
    @Body() body: RequestCreateSchoolDto,
  ) {
    await this.schoolService.createSchool(schoolAdminId, body);
  }

  @Get()
  @ApiOperation({ summary: '학교 페이지 목록 조회' })
  @ApiResponse({ type: ResponseSchoolDto })
  async getList() {
    const schoolList = await this.schoolService.findSchoolList();
    return ResponseSchoolDto.fromInterfaces(schoolList);
  }
}
