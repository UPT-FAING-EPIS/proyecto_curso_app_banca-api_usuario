import { type } from 'os'
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity({name: 'USUARIOS'})
export class User {
    @PrimaryGeneratedColumn()
    IDUSUARIO : number

    @Column()
    CORREO: string

    @Column({unique:true})
    USUARIO: string

    @Column()
    CLAVE:string

    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    FECHACREACION: Date
    
    @Column()
    ESTADO:string

    @Column()
    ROL: string

}