import { Controller, Param, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigProvider } from '@src/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login/students/:studentId')
  @ApiOperation({ summary: '학생 로그인' })
  async student(
    @Res({ passthrough: true }) res: any,
    @Param('studentId') studentId: number,
  ) {
    const accessToken = this.jwtService.sign(
      { studentId },
      ConfigProvider.getConfig().jwt.access,
    );

    res.cookie(
      'classting_student_access_token',
      accessToken,
      ConfigProvider.getConfig().jwt.access,
    );
    res.cookie(
      'classting_student_payload',
      { studentId },
      ConfigProvider.getConfig().jwt.refresh,
    );
  }

  @Post('login/school-admins/:schoolAdminId')
  @ApiOperation({ summary: '학교 관리자 로그인' })
  async schoolAdmin(
    @Res({ passthrough: true }) res: any,
    @Param('schoolAdminId') schoolAdminId: number,
  ) {
    const accessToken = this.jwtService.sign(
      { schoolAdminId },
      ConfigProvider.getConfig().jwt.access,
    );

    res.cookie(
      'classting_school_admin_access_token',
      accessToken,
      ConfigProvider.getConfig().jwt.access,
    );
    res.cookie(
      'classting_school_admin_payload',
      { schoolAdminId },
      ConfigProvider.getConfig().jwt.refresh,
    );
  }
}
