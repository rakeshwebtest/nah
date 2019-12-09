import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, nullable: true })
    name: string;

    @Column({ length: 25, nullable: true })
    firstName: string;

    @Column({ length: 25, nullable: true })
    lastName: string;

    @Column({ length: 25 })
    email: string;

    @Column({ length: 250, nullable: true })
    photoUrl: string;

    @Column({ length: 25, nullable: true })
    provider: string;

    @Column({ type: 'text', nullable: true })
    idToken: string;

    @Column({ length: 25, default: '' })
    profile_pic: string;

    @Column({ length: 25, default: '' })
    country: string;

}
