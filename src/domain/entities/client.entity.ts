import { Entity } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'clients' })
export class Client extends User {}
