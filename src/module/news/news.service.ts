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
  async createNews(body: RequestCreateNewsDto) {
    await this.checkAccessNews(body.schoolAdminId);

    try {
      await NewsRepository.save(plainToInstance(NewsEntity, body));
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

  async updateNews(newsId: number, body: RequestUpdateNewsDto) {
    await this.checkAccessNews(body.schoolAdminId);
    await NewsRepository.update(
      newsId,
      plainToInstance(NewsEntity, { content: body.content }), // TODO: 로그인 기능 개발시 수정
    );
  }

  async deleteNews(newsId: number) {
    await this.checkAccessNews(1); // TODO: 로그인 기능 개발시 수정
    const deleteResult = await NewsRepository.softDelete(newsId);

    if (deleteResult.affected === 0) {
      throw new Error('삭제되지 않았습니다.');
    }
  }

  async findSchoolList() {
    return await NewsRepository.find({ order: { createdAt: 'DESC' } });
  }
}
