import { Entity } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'administrators' })
export class Administrator extends User {}
