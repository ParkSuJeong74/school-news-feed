import { getEntityManager } from '@src/database/data-source';
import { NewsEntity } from '@src/database/entity/news.entity';
import { DataSource, EntityManager } from 'typeorm';

export const getNewsRepository = (source?: EntityManager | DataSource) =>
  getEntityManager(source).getRepository(NewsEntity).extend({});

export const NewsRepository = getNewsRepository();
