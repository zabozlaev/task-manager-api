import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectEntity } from 'src/project/project.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  email?: string;

  @Column('text')
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ProjectEntity, project => project.user)
  projects: ProjectEntity[];
}
