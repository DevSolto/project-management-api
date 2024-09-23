import { Task } from 'src/modules/tasks/entities/task.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    unique: true
  })
  userName: string

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @ManyToMany(() => Task)
  @JoinTable()
  tasks: Task[]
}
