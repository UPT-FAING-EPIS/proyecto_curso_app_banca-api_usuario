import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date
}
