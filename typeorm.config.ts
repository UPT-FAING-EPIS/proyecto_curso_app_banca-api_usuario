import { User } from './src/domain/entities/user.entity'
import { DataSource } from 'typeorm'

module.exports = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'alcbart12',
  database: 'users',
  entities: [User],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
})
