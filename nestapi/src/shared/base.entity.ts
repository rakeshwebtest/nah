// base.entity.ts
import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedDate: Date;

    @BeforeUpdate()
    updateTimestamp() {
        // tslint:disable-next-line:new-parens
        this.updatedDate = new Date;
    }

}