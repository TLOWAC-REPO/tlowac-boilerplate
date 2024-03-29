import { SkipAuth } from '@/common/decorators/skipAuth.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/signIn.req';
import { SignUpReqDto } from './dto/signup.req';

@Controller('auth')
export class AuthController {
        constructor(private readonly authService: AuthService) {}

        @Post('signin')
        @SkipAuth()
        async signIn(@Body() data: SignInReqDto) {
                const payload = await this.authService.signIn(data);
                return payload;
        }

        @Post('signup')
        @SkipAuth()
        async signUp(@Body() data: SignUpReqDto) {
                const payload = await this.authService.signUp(data);
                return payload;
        }
}
