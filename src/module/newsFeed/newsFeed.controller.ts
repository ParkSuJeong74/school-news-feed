import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseNewsFeedDto } from './dto/responseNewsFeed.dto';
import { NewsFeedService } from './newsFeed.service';

@ApiTags('NewsFeed')
@Controller('news-feed')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @Get(':studentId') // TODO: 로그인 구현 후 삭제
  @ApiOperation({ summary: '뉴스피드 조회' })
  @ApiResponse({ type: ResponseNewsFeedDto })
  async getList(@Param('studentId') studentId: number) {
    const newsFeed = await this.newsFeedService.findNewsFeedList(studentId);
    return ResponseNewsFeedDto.fromInterfaces(newsFeed).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}
