import { EntityRepository, Repository } from "typeorm";
import { PartsDetail } from '../entities/parts-detail.entity';

@EntityRepository(PartsDetail)
export class PartsRepository extends Repository<PartsDetail>{


}