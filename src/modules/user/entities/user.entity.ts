import { Project } from 'src/modules/project/entities/project.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  userName: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Task)
  @JoinTable()
  tasks: Task[];

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Project, (project) => project.creator)
  createdProjects: Project[];

  @OneToMany(() => Task, (task) => task.creator)
  createdTasks: Task[];
}
