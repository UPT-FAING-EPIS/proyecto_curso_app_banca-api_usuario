import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    IDUSUARIO : number

    @Column({nullable:true})
    CORREO: string

    @Column({unique:true})
    USUARIO: string;

    @Column()
    CLAVE:string;

    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    FECHACREACION: Date;
    
    @Column({nullable:true})
    ESTADO:string

    @Column({nullable:true})
    ROL: string

}