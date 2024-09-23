import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  dueDate: Date

  @Column({
    nullable: true
  })
  completionDate: Date

  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];
}
