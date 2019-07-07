import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ProjectEntity } from 'src/project/project.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('boolean', {
    default: false,
  })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ProjectEntity, project => project.tasks, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @Column('uuid')
  projectId: string;
}
