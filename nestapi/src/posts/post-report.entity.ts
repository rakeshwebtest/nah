import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
import { ReportCateogryEntity } from 'src/report-category/report-category.entity';
@Entity({ name: 'post_report' })
export class PostReportEntity extends BaseEntity {
  
    @ManyToOne(type => PostEntity, post => post.reports, { onDelete: 'CASCADE' })
    post: PostEntity;

    @Column({ length: 1250, nullable: true })
    comment: string;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 
    
    @ManyToOne(type => UserEntity, user => user.postReports, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

    @ManyToOne(type => ReportCateogryEntity, c => c.postReports, { onDelete: 'CASCADE' })
    category: ReportCateogryEntity;

}
