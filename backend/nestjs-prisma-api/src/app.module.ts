import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedProviderModule } from './providers/shared-provider.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './domain/auth/guards/jwt/jwt-auth.guard';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';

@Module({
        imports: [SharedProviderModule, AuthModule, UserModule],
        controllers: [AppController],
        providers: [
                AppService,
                {
                        provide: APP_GUARD,
                        useClass: JwtAuthGuard,
                },
        ],
})
export class AppModule {}
