import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @Column({ length: 25, nullable: true })
    displayName: string;

    @Column({ length: 250 })
    email: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    @Column({ length: 25, nullable: true })
    provider: string;

    @Column({ type: 'text', nullable: true })
    idToken: string;

    @Column({ length: 25, nullable: true })
    typeOfNoer: string;

    @Column({ length: 25, default: '' })
    country: string;

    // @OneToMany(type => GroupEntity, group => group.createBy)
    // groups: GroupEntity[];

    @OneToMany(type => GroupFollowEntity, gf => gf.user)
    following: GroupFollowEntity[];

}
