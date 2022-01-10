import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BikeBaseEntity {

    @CreateDateColumn()
    @Column('datetime', {
        name: 'created_date',
        default: () => 'current_timestamp'
    })
    createdDTM: Date;

    @UpdateDateColumn()
    @Column('datetime', {
        name: 'modified_date',
        default: () => 'current_timestamp'
    })
    modifiedDTM: Date;
}