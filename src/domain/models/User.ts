import { Rol } from './Rol'

export class User {
  idUsuario: number
  correo: string
  usuario: string
  clave: string
  rol: Rol
  estaActivo: boolean

  constructor (idUsuario: number, correo: string, usuario: string, clave: string, rol: Rol) {
    this.idUsuario = idUsuario
    this.correo = correo
    this.usuario = usuario
    this.clave = clave
    this.rol = rol
  }
}