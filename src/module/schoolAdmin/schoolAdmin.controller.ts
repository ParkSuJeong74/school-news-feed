import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateSchoolAdminDto } from './dto/requestSchoolAdmin.dto';
import { ResponseSchoolAdminDto } from './dto/responseSchoolAdmin.dto';
import { SchoolAdminService } from './schoolAdmin.service';

@ApiTags('SchoolAdmin')
@Controller('school-admins')
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) {}

  @Post()
  @ApiOperation({ summary: '학교 관리자 생성' })
  async create(@Body() body: RequestCreateSchoolAdminDto) {
    await this.schoolAdminService.createSchoolAdmin(body);
  }

  @Get()
  @ApiOperation({ summary: '학교 관리자 목록 조회' })
  @ApiResponse({ type: [ResponseSchoolAdminDto] })
  async getList() {
    const schoolAdminList = await this.schoolAdminService.findSchoolAdminList();
    return ResponseSchoolAdminDto.fromInterfaces(schoolAdminList);
  }
}
