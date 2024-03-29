import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInReqDto } from './dto/signIn.req';
import { SignUpReqDto } from './dto/signup.req';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
        constructor(
                private readonly userService: UserService,
                private readonly jwtService: JwtService,
        ) {}

        async signIn(data: SignInReqDto): Promise<{ access_token: string }> {
                const { email, password } = data;

                const user = await this.userService.findOne(email);
                if (!user) {
                        throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
                }

                const isValidPwd = await bcrypt.compare(password, user.password);
                if (!isValidPwd) {
                        throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
                }

                const payload = { sub: user.id, email: user.email };

                return {
                        access_token: await this.jwtService.sign(payload),
                };
        }

        async signUp(data: SignUpReqDto): Promise<{ access_token: string }> {
                const { email, password } = data;

                const isEmailRegistered = await this.userService.findOne(email);
                if (isEmailRegistered) {
                        throw new BadRequestException('이미 등록된 이메일 주소입니다. ');
                }

                const hashedPassword = bcrypt.hashSync(password, 10);

                const newUser = await this.userService.create({ email, password: hashedPassword });

                const payload = { sub: newUser.id, email: newUser.email };

                return {
                        access_token: await this.jwtService.sign(payload),
                };
        }
}
