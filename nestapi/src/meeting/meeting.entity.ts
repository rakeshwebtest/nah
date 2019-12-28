import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'meeting' })
export class MeetingEntity extends BaseEntity {

    @Column({ length: 25, nullable: true })
    name: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
