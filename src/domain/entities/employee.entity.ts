import { Entity } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'employees' })
export class Employee extends User {}
