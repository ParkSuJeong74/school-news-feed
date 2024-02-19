import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigProvider } from '@src/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SchoolAdminJwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies.classting_school_admin_access_token;
    try {
      const jwtService = new JwtService();
      if (jwtService.verify(accessToken, ConfigProvider.getConfig().jwt.access))
        return true;
    } catch {
      throw new Error('토큰정보를 확인할 수 없습니다.');
    }
    throw new Error('토큰정보를 확인할 수 없습니다.');
  }

  handleRequest<TUser = any>(err: any, validate: any, info: any): TUser {
    if (info) throw new Error();
    if (!validate) throw new Error('유저 정보가 없습니다');
    if (err) {
      console.error('JwtGuard', err);
      throw new Error('예기치 못한 오류가 발생하였습니다');
    }

    return validate;
  }
}

@Injectable()
export class StudentJwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies.classting_student_access_token;
    try {
      const jwtService = new JwtService();
      if (jwtService.verify(accessToken, ConfigProvider.getConfig().jwt.access))
        return true;
    } catch {
      throw new Error('토큰정보를 확인할 수 없습니다.');
    }
    throw new Error('토큰정보를 확인할 수 없습니다.');
  }

  handleRequest<TUser = any>(err: any, validate: any, info: any): TUser {
    if (info) throw new Error();
    if (!validate) throw new Error('유저 정보가 없습니다');
    if (err) {
      console.error('JwtGuard', err);
      throw new Error('예기치 못한 오류가 발생하였습니다');
    }

    return validate;
  }
}
