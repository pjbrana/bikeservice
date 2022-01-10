import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@bike/auth/user.repository';
import { AuthService } from '@bike/auth';
import { UserDto } from '@bike/auth/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private authService: AuthService,
    ) { }

    async signUp(userDto: UserDto): Promise<void> {
        return this.userRepository.createUser(userDto);
    }

    async signIn(userDto: UserDto): Promise<{ accessToken: string }> {
        const { email, password } = userDto;
        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return this.authService.getToken(email);
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }
}
