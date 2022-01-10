import { EntityRepository, getConnection, Repository } from "typeorm";
import { Servicing } from '../entities/servicing.entity';

@EntityRepository(Servicing)
export class ServiceRepository extends Repository<Servicing>{


    async findByBillAmount(amount: number): Promise<any> {

        const servicing = await getConnection()
            .createQueryBuilder()
            .select("servicing")
            .from(Servicing, "servicing")
            .where("servicing.bill_amount = :amount", { amount }).getMany();

        return servicing;
    }
}