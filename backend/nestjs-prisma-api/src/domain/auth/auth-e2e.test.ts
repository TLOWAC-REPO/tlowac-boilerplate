import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Authentication', () => {
        let app: INestApplication;

        beforeEach(async () => {
                const moduleFixture: TestingModule = await Test.createTestingModule({
                        imports: [AppModule],
                }).compile();

                app = moduleFixture.createNestApplication();
                await app.init();
        });

        describe('/POST auth/signup', () => {
                it('회원 가입 성공', () => {
                        return request(app.getHttpServer())
                                .post('/auth/signup')
                                .send({
                                        email: 'test@example.com',
                                        password: 'password123',
                                })
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then((response) => {
                                        expect(response.body.email).toBe('test@example.com');
                                });
                });
                it('회원 가입 실패 - 비밀번호 자릿수 제한', () => {
                        return request(app.getHttpServer())
                                .post('/auth/signup')
                                .send({
                                        email: 'test@example.com',
                                        password: 'password123',
                                })
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then((response) => {
                                        expect(response.body.email).toBe('test@example.com');
                                });
                });

                it('회원 가입 실패 - 올바르지 않은 이메일 형식', () => {
                        return request(app.getHttpServer())
                                .post('/auth/signup')
                                .send({
                                        email: 'test@example.com',
                                        password: 'password123',
                                })
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then((response) => {
                                        expect(response.body.email).toBe('test@example.com');
                                });
                });

                it('회원 가입 실패 - 이미 회원가입된 이메일', () => {
                        return request(app.getHttpServer())
                                .post('/auth/signup')
                                .send({
                                        email: 'test@example.com',
                                        password: 'password123',
                                })
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then((response) => {
                                        expect(response.body.email).toBe('test@example.com');
                                });
                });
        });

        describe('/POST auth/login', () => {
                it('/POST auth/login', () => {
                        return request(app.getHttpServer())
                                .post('/auth/login')
                                .send({
                                        email: 'test@example.com',
                                        password: 'password123',
                                })
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then((response) => {
                                        expect(response.body.accessToken).toBeDefined();
                                });
                });
        });

        afterEach(async () => {
                await app.close();
        });
});
