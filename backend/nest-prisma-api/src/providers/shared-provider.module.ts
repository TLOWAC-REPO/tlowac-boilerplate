import type { Provider as ProviderType } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { EnvConfigService, EnvModule } from './env';
import { PrismaModule, PrismaService } from './prisma';

const providers: ProviderType[] = [EnvConfigService, PrismaService];

const modules: any[] = [EnvModule, PrismaModule];

@Global()
@Module({
        imports: [...modules],
        providers,
        exports: [...providers],
})
export class SharedProviderModule {}
