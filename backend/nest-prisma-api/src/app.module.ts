import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedProviderModule } from './providers/shared-provider.module';

@Module({
        imports: [SharedProviderModule],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}
