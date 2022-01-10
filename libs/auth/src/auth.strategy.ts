import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "@bike/auth/user.repository";
import { JwtPayload } from "@bike/auth/jwt-payload.interface";
import { User } from "@bike/auth/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // @Inject(authJwtConfig.KEY)
        // private readonly authConfig: ConfigType<typeof authJwtConfig>,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'kist123',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}