import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async createUser(userDto: UserDto): Promise<void> {
        const { email, password } = userDto;
        const salt = await bcrypt.genSalt();
        const hasdedPass = await bcrypt.hash(password, salt);
        const user = this.create({ email, password: hasdedPass });
        try {
            await this.save(user);
        } catch (error) {
            console.log(error.code);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email already exists ');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}