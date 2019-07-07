import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { TaskEntity } from 'src/task/task.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column('uuid')
  userId: string;

  @OneToMany(() => TaskEntity, task => task.project)
  tasks: TaskEntity[];
}
