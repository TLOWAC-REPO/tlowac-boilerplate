import { isNil } from 'lodash';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
        constructor(private configService: ConfigService) {}

        private get(key: string): string {
                const value = this.configService.get<string>(key);

                if (isNil(value)) {
                        process.on('exit', () => {
                                console.error(key + ' environment variable does not set');
                        });
                }

                return value;
        }

        private getNumber(key: string): number {
                const value = this.get(key);

                try {
                        return Number(value);
                } catch {
                        throw new Error(key + ' environment variable is not a number');
                }
        }

        private getBoolean(key: string): boolean {
                const value = this.get(key);

                try {
                        return Boolean(JSON.parse(value));
                } catch {
                        throw new Error(key + ' environment variable is not a boolean');
                }
        }

        private getString(key: string): string {
                const value = this.get(key);

                try {
                        return value.replace(/\\n/g, '\n');
                } catch {
                        throw new Error(key + ' environment variable does not string');
                }
        }

        get nodeEnv(): string {
                return this.getString('NODE_ENV');
        }
}
