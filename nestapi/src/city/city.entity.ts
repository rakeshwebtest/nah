import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from '../user/user.entity';
@Entity({ name: 'city' })
export class CityEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    name: string;

    @OneToMany(type => UserEntity, user => user.city)
    users: UserEntity[];

}
