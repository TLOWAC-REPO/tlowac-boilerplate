import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '@/providers/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(configService: EnvConfigService) {
                super({
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                        ignoreExpiration: false,
                        secretOrKey: configService.jwt.privateKey,
                });
        }

        async validate(payload: { userId: string }) {
                return { userId: payload.userId };
        }
}
