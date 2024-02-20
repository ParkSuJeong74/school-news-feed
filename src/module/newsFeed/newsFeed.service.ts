import { Injectable } from '@nestjs/common';
import { NewsRepository } from '../news/news.repository';
import { SubscribeSchoolStudentRepository } from '../subscribeSchoolStudent/subscribeSchoolStudent.repository';

@Injectable()
export class NewsFeedService {
  async findNewsFeedList(studentId: number) {
    const subscribeList = await SubscribeSchoolStudentRepository.findBy({
      studentId,
    });

    const news = await Promise.all(
      subscribeList.map((sub) => {
        return NewsRepository.find({
          where: { schoolId: sub.schoolId },
          order: { createdAt: 'DESC' },
        });
      }),
    );

    return news.flat();
  }
}
