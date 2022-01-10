import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'user_tbl' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('datetime', {
        name: 'created_time',
        default: () => 'current_timestamp'
    })
    createdTime: Date;

    @UpdateDateColumn()
    @Column('datetime', {
        name: 'update_time',
        default: () => 'current_timestamp'
    })
    updatedTime: Date;

    @Column({ nullable: true })
    salt: string;
}