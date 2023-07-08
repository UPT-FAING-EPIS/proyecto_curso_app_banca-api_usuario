import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn()
  id: string

  @Column({ unique: true })
  name: string

  @Column()
  image: string

  @Column()
  route: string

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  created_at: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
