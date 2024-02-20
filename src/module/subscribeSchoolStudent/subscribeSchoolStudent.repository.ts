import { getEntityManager } from '@src/database/data-source';
import { SubscribeSchoolStudentEntity } from '@src/database/entity/subscribeSchoolStudent.entity';
import { DataSource, EntityManager } from 'typeorm';

export const getSubscribeSchoolStudentRepository = (
  source?: EntityManager | DataSource,
) =>
  getEntityManager(source)
    .getRepository(SubscribeSchoolStudentEntity)
    .extend({});

export const SubscribeSchoolStudentRepository =
  getSubscribeSchoolStudentRepository();
