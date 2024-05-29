import { SkipAuth } from '@/common/decorators/skipAuth.decorator';
import { Body, Controller, Get, Post, Req, Res, UseGuards, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/signIn.req';
import { SignUpReqDto } from './dto/signup.req';
import { GithubOAuthGuard } from './guards/github/github-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
        constructor(
                private readonly authService: AuthService,
                private readonly jwtService: JwtService,
        ) {}

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

        @Get('github')
        @UseGuards(GithubOAuthGuard)
        async githubAuth() {}

        @Get('github/callback')
        @UseGuards(GithubOAuthGuard)
        async githubOAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
                const user = req.user as User;

                const { accessToken } = this.jwtService.login(user);
                res.cookie('jwt', accessToken);
                return { access_token: accessToken };
        }
}
