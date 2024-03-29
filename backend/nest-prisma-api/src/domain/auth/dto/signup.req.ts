import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpReqDto {
        @IsEmail()
        email: string;

        @IsStrongPassword()
        password: string;
}
