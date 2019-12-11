import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
@Entity({ name: 'group_follows' })
export class GroupEntity extends BaseEntity {
    @Column()
    groupId: number;

    @Column()
    userId: number;
}
