import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BikeBaseEntity } from "./bike-base.entity";
import { Servicing } from './servicing.entity';

@Entity({ name: 'parts_details' })
export class PartsDetail extends BikeBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, name: 'name' })
    name: string;
    @Column({ name: 'price' })
    price: number;
    @Column({ length: 100, name: 'company' })
    company: string;
    @Column({ name: 'quantity' })
    quantity: number;

    @ManyToOne(() => Servicing, servicing => servicing.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'servicing_id' })
    servicing: Servicing;

}