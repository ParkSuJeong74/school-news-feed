import { getEntityManager } from '@src/database/data-source';
import { SchoolAdminEntity } from '@src/database/entity/schoolAdmin.entity';
import { DataSource, EntityManager } from 'typeorm';

export const getSchoolAdminRepository = (source?: EntityManager | DataSource) =>
  getEntityManager(source).getRepository(SchoolAdminEntity).extend({});

export const SchoolAdminRepository = getSchoolAdminRepository();
