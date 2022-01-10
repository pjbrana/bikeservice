import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BikeBaseEntity } from "./bike-base.entity";
import { PartsDetail } from "./parts-detail.entity";

@Entity({ name: 'servicing_tbl' })
export class Servicing extends BikeBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'bill_amount', nullable: false })
    billAmount: number;

    @Column("varchar", { name: 'bill_picture', nullable: true })
    billPicPath: string;

    @OneToMany(() => PartsDetail, parts => parts.servicing, {
        eager: true,
        cascade: true,
    })
    parts: PartsDetail[];
}