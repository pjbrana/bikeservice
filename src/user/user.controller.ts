import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../../libs/auth/src/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post('/signup')
    signUp(@Body() userDto: UserDto): Promise<void> {
        return this.userService.signUp(userDto);
    }

    @Post('/signin')
    signIn(@Body() userDto: UserDto): Promise<{ accessToken: string }> {
        return this.userService.signIn(userDto);
    }
}
