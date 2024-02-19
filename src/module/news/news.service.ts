import { Injectable } from '@nestjs/common';
import { NewsEntity } from '@src/database/entity/news.entity';
import { plainToInstance } from 'class-transformer';
import { SchoolRepository } from '../school/school.repository';
import {
  RequestCreateNewsDto,
  RequestUpdateNewsDto,
} from './dto/requestNews.dto';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  async createNews(schoolAdminId: number, body: RequestCreateNewsDto) {
    await this.checkAccessNews(schoolAdminId);

    try {
      await NewsRepository.save(
        plainToInstance(NewsEntity, { schoolAdminId, ...body }),
      );
    } catch (err) {
      throw new Error('학교 소식을 생성하지 못했습니다.');
    }
  }

  async checkAccessNews(schoolAdminId: number) {
    const school = await SchoolRepository.findOneBy({
      schoolAdminId,
    });

    if (!school) {
      throw new Error('해당 학교 관리자가 아닙니다.');
    }
  }

  async updateNews(
    schoolAdminId: number,
    newsId: number,
    body: RequestUpdateNewsDto,
  ) {
    await this.checkAccessNews(schoolAdminId);
    await NewsRepository.update(newsId, plainToInstance(NewsEntity, body));
  }

  async deleteNews(schoolAdminId: number, newsId: number) {
    await this.checkAccessNews(schoolAdminId);
    const deleteResult = await NewsRepository.softDelete(newsId);

    if (deleteResult.affected === 0) {
      throw new Error('삭제되지 않았습니다.');
    }
  }

  async findSchoolList() {
    return await NewsRepository.find({ order: { createdAt: 'DESC' } });
  }
}
