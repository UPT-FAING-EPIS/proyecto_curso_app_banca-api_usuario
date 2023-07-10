import { Injectable } from '@nestjs/common'
import appConfig from 'infrastructure/config/app.config'

const port = appConfig.port

@Injectable()
export class AppService {
  getHello(): string {
    return `api_usuario running on port ${port}...`
  }
}
