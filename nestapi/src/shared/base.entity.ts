// base.entity.ts
import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Type } from 'class-transformer';

export abstract class BaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedDate: Date;

    // @Column({ type: 'timestamp' })
    // createdDate: Date;

    // @Column({ type: 'timestamp' })
    // updatedDate: Date;

    // @BeforeUpdate()
    // updateTimestamp() {
    //     // tslint:disable-next-line:new-parens
    //     this.updatedDate = new Date();
    // }

    // @BeforeInsert()
    // updateDateCreation() {
    //     this.createdDate = new Date();
    // }

    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedDate = new Date();
    }

}