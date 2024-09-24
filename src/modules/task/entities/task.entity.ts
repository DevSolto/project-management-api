import { Project } from "src/modules/project/entities/project.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  dueDate: Date;

  @Column({
    nullable: true
  })
  completionDate: Date;

  @ManyToOne(() => User, (user) => user.createdTasks)
  creator: User;

  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
