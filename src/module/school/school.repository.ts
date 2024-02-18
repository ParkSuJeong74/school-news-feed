import { getEntityManager } from '@src/database/data-source';
import { SchoolEntity } from '@src/database/entity/school.entity';
import { DataSource, EntityManager } from 'typeorm';

export const getSchoolRepository = (source?: EntityManager | DataSource) =>
  getEntityManager(source).getRepository(SchoolEntity).extend({});

export const SchoolRepository = getSchoolRepository();
