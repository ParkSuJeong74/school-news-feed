import { Module } from '@nestjs/common';
import { SchoolAdminService } from './schoolAdmin.service';

@Module({
  imports: [],
  providers: [SchoolAdminService],
  exports: [SchoolAdminService],
})
export class SchoolAdminModule {}
