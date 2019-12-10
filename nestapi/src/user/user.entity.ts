import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @Column({ length: 25, nullable: true })
    displayName: string;

    @Column({ length: 25 })
    email: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    @Column({ length: 25, nullable: true })
    provider: string;

    @Column({ type: 'text', nullable: true })
    idToken: string;

    @Column({ length: 25, nullable: true })
    type_of_noer: string;

    @Column({ length: 25, default: '' })
    country: string;

}
