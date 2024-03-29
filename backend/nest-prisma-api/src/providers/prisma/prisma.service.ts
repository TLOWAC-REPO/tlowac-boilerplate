import { Prisma, PrismaClient } from '@prisma/client';

import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { EnvConfigService } from '../env';

@Injectable()
export class PrismaService
        extends PrismaClient<Prisma.PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'>
        implements OnModuleInit, OnModuleDestroy
{
        private logger: Logger = new Logger(PrismaService.name);

        constructor(private readonly configService: EnvConfigService) {
                super({
                        datasources: {
                                db: {
                                        url: configService.db.url,
                                },
                        },
                        log: [
                                { emit: 'event', level: 'query' },
                                { emit: 'event', level: 'error' },
                                { emit: 'stdout', level: 'info' },
                                { emit: 'stdout', level: 'warn' },
                        ],
                });
        }

        async onModuleInit() {
                await this.$connect();

                const isProd = this.configService.isProd;

                if (!isProd) {
                        this.logger.log('DB connection established');

                        this.$on('query', async (e) => {
                                this.logger.log('Query: ' + e.query);
                                this.logger.log('Params: ' + e.params);
                                this.logger.log('Duration: ' + e.duration + 'ms\n');
                        });
                        this.$on('error', async (e) => {
                                this.logger.error(e);
                        });
                }
        }

        async onModuleDestroy() {
                await this.$disconnect();

                this.logger.log('DB connection closed');
        }
}
