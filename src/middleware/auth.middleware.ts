import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigProvider } from '@src/config';

@Injectable()
export class SchoolAdminAuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: () => void): Promise<void> {
    try {
      const accessToken = req.cookies.classting_school_admin_access_token;
      if (accessToken) {
        const jwtService = new JwtService();
        const accessSigner = ConfigProvider.getConfig().jwt.access;
        const payload = jwtService.verify(accessToken, accessSigner);
        req.school_admin = payload;
      }
    } catch {}
    return next();
  }
}

@Injectable()
export class StudentAuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: () => void): Promise<void> {
    try {
      const accessToken = req.cookies.classting_student_access_token;
      if (accessToken) {
        const jwtService = new JwtService();
        const accessSigner = ConfigProvider.getConfig().jwt.access;
        const payload = jwtService.verify(accessToken, accessSigner);
        req.student = payload;
      }
    } catch {}
    return next();
  }
}
