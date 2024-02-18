import { NewsInterface } from '@src/interface/news.interface';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { SchoolEntity } from './school.entity';

@Entity('news')
export class NewsEntity extends BasicEntity implements NewsInterface {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;
  @Column()
  schoolId: number;
}
