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
  async create(@Body() body: RequestCreateNewsDto) {
    await this.newsService.createNews(body);
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
  ) {
    await this.newsService.updateNews(newsId, body);
  }

  @Delete(':newsId')
  @ApiOperation({ summary: '3. 소식 삭제' })
  async delete(@Param('newsId') newsId: number) {
    await this.newsService.deleteNews(newsId);
  }
}
