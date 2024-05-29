import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvConfigService } from '@/providers/env';
import { Strategy, Profile } from 'passport-github2';
import { UserService } from '@/domain/user/user.service';
import { AuthProvider } from '@prisma/client';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
        constructor(
                private configService: EnvConfigService,
                private usersService: UserService,
        ) {
                super({
                        clientID: configService.oauth.github.clientId,
                        clientSecret: configService.oauth.github.clientSecret,
                        callbackURL: configService.oauth.github.callbackURL,
                        scope: ['public_profile'],
                });
        }

        async validate(accessToken: string, _refreshToken: string, profile: Profile) {
                const { email } = profile;
                const user = await this.usersService.findOne(email);

                // 회원이 회원가입을 'github' 로 하지 않은 경우 예외처리
                // 다른 방법으로 로그인을 했음을 알리는 메시지 출력
                if (user.provider === AuthProvider.GITHUB) {
                        throw new UnauthorizedException('다른 방법으로 로그인을 했음');
                }

                //

                const { id, name, emails } = profile;

                return {
                        provider: AuthProvider.GITHUB,
                        providerId: id,
                        name: name.givenName,
                        email: emails[0].value,
                };

                return user;
        }
}
