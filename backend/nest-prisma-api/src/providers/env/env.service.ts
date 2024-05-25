import { isNil } from 'lodash';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
        constructor(private configService: ConfigService) {}

        get isLocal(): boolean {
                return this.nodeEnv === 'local';
        }

        get isDev(): boolean {
                return this.nodeEnv === 'dev';
        }

        get isProd(): boolean {
                return this.nodeEnv === 'prod';
        }

        get isTest(): boolean {
                return this.nodeEnv === 'test';
        }

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

        get jwt() {
                return {
                        privateKey: this.getString('JWT_PRIVATE_KEY'),
                        publicKey: this.getString('JWT_PUBLIC_KEY'),
                        jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
                };
        }

        get app() {
                const host = this.getString('HOST');
                const port = this.getString('PORT');
                const url = `${host}:${port}`;

                return {
                        host,
                        port,
                        url,
                };
        }

        get db() {
                return {
                        url: this.getString('DATABASE_URL'),
                        host: this.getString('DATABASE_HOST'),
                };
        }

        get oauth() {
                return {
                        github: {
                                clientId: this.getString('GITHUB_CLIENT_ID'),
                                clientSecret: this.getString('GITHUB_CLIENT_SECRET'),
                                callbackURL: this.getString('GITHUB_CALLBACK_URL'),
                        },
                };
        }
}
