import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from './group.entity';
@Entity({ name: 'group_follows' })
export class GroupFollowEntity extends BaseEntity {

    @ManyToOne(type => GroupEntity, group => group.followers, { onDelete: 'CASCADE' })
    group: GroupEntity;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user.following, { onDelete: 'CASCADE' })
    user: UserEntity;

}
