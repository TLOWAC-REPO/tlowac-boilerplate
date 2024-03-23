import type { Provider as ProviderType } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { EnvConfigService, EnvModule } from './env';

const providers: ProviderType[] = [EnvConfigService];

const modules: any[] = [EnvModule];

@Global()
@Module({
        imports: [...modules],
        providers,
        exports: [...providers],
})
export class SharedProviderModule {}
