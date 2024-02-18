import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateStudentDto } from './dto/requestStudent.dto';
import { ResponseStudentDto } from './dto/responseStudent.dto';
import { StudentService } from './student.service';

@ApiTags('Student')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: '학생 생성' })
  async create(@Body() body: RequestCreateStudentDto) {
    await this.studentService.createStudent(body);
  }

  @Get()
  @ApiOperation({ summary: '학생 목록 조회' })
  @ApiResponse({ type: ResponseStudentDto })
  async getList() {
    const studentList = await this.studentService.findStudentList();
    return ResponseStudentDto.fromInterfaces(studentList);
  }
}
