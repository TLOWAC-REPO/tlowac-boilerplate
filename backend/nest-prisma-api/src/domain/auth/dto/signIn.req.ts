import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInReqDto {
        @IsEmail()
        email: string;

        @IsStrongPassword()
        password: string;
}
