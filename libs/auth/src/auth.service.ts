import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async getToken(email: string): Promise<{ accessToken: string }> {
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

}
