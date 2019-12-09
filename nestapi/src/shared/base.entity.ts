// base.entity.ts
import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        // tslint:disable-next-line:new-parens
        this.updated = new Date;
    }

}