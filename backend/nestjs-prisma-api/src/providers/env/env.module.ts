import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigService } from './env.service';
import { envValidator } from './env-validator';

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        envFilePath: `.env.${process.env.NODE_ENV}`,
                        validationSchema: envValidator,
                }),
        ],
        providers: [EnvConfigService],
        exports: [EnvConfigService],
})
export class EnvModule {}
