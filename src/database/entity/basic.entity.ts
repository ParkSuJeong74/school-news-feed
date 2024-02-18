import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

interface BasicTimesInterface {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class BasicEntity implements BasicTimesInterface {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
