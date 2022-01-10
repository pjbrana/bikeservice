import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from './repository/service.repository';
import { ServicingDto } from './dto/servicing.dto';
import { Servicing } from './entities/servicing.entity';
import { PartsDetail } from './entities/parts-detail.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BikeService {
    constructor(private readonly serviceRepository: ServiceRepository) { }

    async getAllServicing() {
        return await this.serviceRepository.find();
    }

    async save(servicingDto: ServicingDto) {

        const servicing = new Servicing();
        servicing.billAmount = servicingDto.billAmount;
        servicing.billPicPath = servicingDto.billPicPath;
        servicing.parts = servicingDto?.parts?.map(part => {
            const partDetail = new PartsDetail();
            partDetail.name = part.name;
            partDetail.company = part.company;
            partDetail.price = part.price;
            partDetail.quantity = part.quantity;
            return partDetail;
        })

        return await this.serviceRepository.save(servicing);
    }


    async findServicingById(id): Promise<Servicing> {
        return await this.serviceRepository.findOne(id);
    }

    async deleteById(id: number) {
        const service: Servicing = await this.findServicingById(id);
        return this.serviceRepository.remove(service);
    }

    async updateService(id: number, servicingDto: ServicingDto): Promise<Servicing> {
        const service: Servicing = await this.findServicingById(id);
        if (!service) {
            throw new NotFoundException(`Service with id ${id} not found.`);
        }

        service.billAmount = servicingDto.billAmount;
        service.billPicPath = servicingDto.billPicPath;
        const partsDetails: PartsDetail[] = servicingDto.parts.map(part => {
            const partsDetail: PartsDetail = new PartsDetail();
            partsDetail.company = part.company;
            partsDetail.name = part.name;
            partsDetail.price = part.price;
            partsDetail.quantity = part.quantity;
            return partsDetail;
        });
        service.parts = partsDetails;
        return await this.serviceRepository.save(service);
    }

}
