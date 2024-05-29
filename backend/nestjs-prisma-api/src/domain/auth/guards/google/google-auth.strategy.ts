import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '@/providers/env';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthProvider } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
        constructor(private readonly configService: EnvConfigService) {
                super({
                        clientID: configService.oauth.google.clientId,
                        clientSecret: configService.oauth.google.clientSecret,
                        callbackURL: configService.oauth.google.callbackURL,
                        scope: ['email', 'profile'],
                });
        }

        validate(accessToken: string, refreshToken: string, profile: Profile) {
                const { id, name, emails } = profile;

                return {
                        provider: AuthProvider.GOOGLE,
                        providerId: id,
                        name: name.givenName,
                        email: emails[0].value,
                };
        }
}
