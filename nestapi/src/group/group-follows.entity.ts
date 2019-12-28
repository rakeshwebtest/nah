import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'group_follows' })
export class GroupFollowEntity extends BaseEntity {
    @Column()
    groupId: number;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user.following)
    user: UserEntity;

}
