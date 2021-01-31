import { PostReportEntity } from 'src/posts/post-report.entity';
import { PostEntity } from 'src/posts/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
@Entity({ name: 'report_category' })
export class ReportCateogryEntity extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(type => PostReportEntity, pr => pr.category)
    postReports: PostReportEntity[];

}
