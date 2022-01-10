import { LocalGaurd } from '@bike/auth/localgaurd.gaurd';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from 'libs/utils/file-upload.util';
import { diskStorage } from 'multer';
import { fileURLToPath } from 'url';
import { BIKE_BILL_PIC_UPLOAD_FOLDER } from './bike.constant';
import { BikeService } from './bike.service';
import { ServicingDto } from './dto/servicing.dto';
import { Servicing } from './entities/servicing.entity';

@ApiTags('servicing')
@Controller('bike/')
export class BikeController {

    constructor(private readonly bikeSerive: BikeService) {
    }

    @UseGuards(AuthGuard())
    @Get()
    async getALlServicing() {
        return await this.bikeSerive.getAllServicing();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: BIKE_BILL_PIC_UPLOAD_FOLDER,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async save(@UploadedFile() file, @Body() body: ServicingDto) {
        body.billPicPath = file.path;
        return await this.bikeSerive.save(body);
    }

    @Get(':id/img')
    async getBillPic(@Param('id') id, @Res() res) {
        const servicing: Servicing = await this.bikeSerive.findServicingById(id);
        return res.sendFile(servicing.billPicPath, { root: './' });
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: BIKE_BILL_PIC_UPLOAD_FOLDER,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async updateServicing(@Param('id') id, @Body() body: ServicingDto, @UploadedFile() file,) {
        body.billPicPath = file.path;
        return await this.bikeSerive.updateService(id, body);
    }

    @Delete(':id')
    async deleteServicing(id) {
        return this.bikeSerive.deleteById(id);
    }
}
