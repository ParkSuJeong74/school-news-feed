import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function AuthTokenInfo(ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest();

  if (req.school_admin) {
    return req.school_admin.schoolAdminId;
  }
  if (req.student) {
    return req.student.studentId;
  }
  throw new Error('유효하지 않는 토큰입니다.');
}

export const StudentId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => AuthTokenInfo(ctx),
);

export const SchoolAdminId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => AuthTokenInfo(ctx),
);
