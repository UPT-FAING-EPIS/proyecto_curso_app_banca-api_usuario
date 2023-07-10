import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateRoleDto } from 'application/dtos/create-role.dto'
import { JwtRole } from 'infrastructure/auth/jwt-role'
import { JwtAuthGuard } from 'infrastructure/auth/jwt-auth.guard'
import { JwtRolesGuard } from 'infrastructure/auth/jwt-roles.guard'
import { HasRoles } from 'infrastructure/auth/has-roles'
import { RolesUseCases } from 'application/use-cases/RolesUseCases'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesUseCases: RolesUseCases) {}

  @HasRoles(JwtRole.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @ApiOperation({ summary: 'Crear rol' })
  @ApiOkResponse({ description: 'Rol creado' })
  @ApiBadRequestResponse({ description: 'Error al crear rol' })
  @ApiBearerAuth()
  @Post() // http://localhost:3000/roles -> POST
  create(@Body() rol: CreateRoleDto) {
    return this.rolesUseCases.createRole(rol)
  }
}
