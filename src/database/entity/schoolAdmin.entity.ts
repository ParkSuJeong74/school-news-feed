import { SchoolAdminInterface } from '@src/interface/schoolAdmin.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('school_admin')
export class SchoolAdminEntity
  extends BasicEntity
  implements SchoolAdminInterface
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
