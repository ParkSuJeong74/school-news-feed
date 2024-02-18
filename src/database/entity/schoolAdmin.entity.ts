import { SchoolAdminInterface } from '@src/interface/schoolAdmin.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('school_admin')
export class SchoolAdminEntity
  extends BasicEntity
  implements SchoolAdminInterface
{
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
