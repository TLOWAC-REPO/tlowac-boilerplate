import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EnvConfigService } from '@/providers/env';
import { UserService } from '../user/user.service';

@Module({
        imports: [
                JwtModule.registerAsync({
                        global: true,

                        useFactory: (configService: EnvConfigService) => ({
                                secret: configService.jwt.privateKey,
                                signOptions: { expiresIn: configService.jwt.jwtExpirationTime },
                        }),
                        inject: [EnvConfigService],
                }),
        ],
        providers: [AuthService, UserService],
        controllers: [AuthController],
        exports: [AuthService],
})
export class AuthModule {}
