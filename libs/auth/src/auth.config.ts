import { registerAs } from "@nestjs/config";

export default registerAs('authJwtConfig', () => ({
    secret: process.env.JWT_SECRET,
}))