import { Module } from '@nestjs/common';
import { NewsFeedService } from './newsFeed.service';

@Module({
  imports: [],
  providers: [NewsFeedService],
  exports: [NewsFeedService],
})
export class NewsFeedModule {}
