import { getEntityManager } from '@src/database/data-source';
import { StudentEntity } from '@src/database/entity/student.entity';
import { DataSource, EntityManager } from 'typeorm';

export const getStudentRepository = (source?: EntityManager | DataSource) =>
  getEntityManager(source).getRepository(StudentEntity).extend({});

export const StudentRepository = getStudentRepository();
