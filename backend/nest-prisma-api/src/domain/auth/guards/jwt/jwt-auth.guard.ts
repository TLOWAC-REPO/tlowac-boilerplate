import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_API } from 'src/common/decorators/skipAuth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
        constructor(private reflector: Reflector) {
                super();
        }

        // 글로벌 Guard 등록
        // @SkipAuth() 데코레이터에 대한 예외처리 로직
        canActivate(context: ExecutionContext) {
                // Handler/Class 에서 IS_PUBLIC_API 키값 메타데이터 검색
                const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_API, [
                        context.getHandler(),
                        context.getClass(),
                ]);

                // IS_PUBLIC_API 키값 메타데이터가 존재 하는 경우
                // @SkipAuth() : jwt 인증 처리 생략
                if (isPublic) {
                        return true;
                }

                return super.canActivate(context);
        }
}
