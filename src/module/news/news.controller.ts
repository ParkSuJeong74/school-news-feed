import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchoolAdminId } from '@src/decorator/auth.decorator';
import { SchoolAdminJwtAuthGuard } from '../auth/auth.guard';
import {
  RequestCreateNewsDto,
  RequestUpdateNewsDto,
} from './dto/requestNews.dto';
import { ResponseNewsDto } from './dto/responseNews.dto';
import { NewsService } from './news.service';

@ApiTags('News')
@UseGuards(SchoolAdminJwtAuthGuard)
@Controller('schools/:schoolId/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: '2. 소식 작성' })
  async create(
    @Param('schoolId') schoolId: number,
    @SchoolAdminId() schoolAdminId: number,
    @Body() body: RequestCreateNewsDto,
  ) {
    await this.newsService.createNews(schoolAdminId, schoolId, body);
  }

  @Get()
  @ApiOperation({ summary: '모든 소식 목록 조회' })
  @ApiResponse({ type: ResponseNewsDto })
  async getList() {
    const newsList = await this.newsService.findSchoolList();
    return ResponseNewsDto.fromInterfaces(newsList);
  }

  @Put(':newsId')
  @ApiOperation({ summary: '4. 소식 수정' })
  async update(
    @Param('newsId') newsId: number,
    @Body() body: RequestUpdateNewsDto,
    @SchoolAdminId() schoolAdminId: number,
  ) {
    await this.newsService.updateNews(schoolAdminId, newsId, body);
  }

  @Delete(':newsId')
  @ApiOperation({ summary: '3. 소식 삭제' })
  async delete(
    @SchoolAdminId() schoolAdminId: number,
    @Param('newsId') newsId: number,
  ) {
    await this.newsService.deleteNews(schoolAdminId, newsId);
  }
}
