import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
        constructor(private readonly prismaService: PrismaService) {}

        async findOne(email: string) {
                const user = await this.prismaService.user.findUnique({
                        where: {
                                email,
                        },
                });

                return user;
        }

        async create(data: Prisma.UserCreateInput) {
                const user = await this.prismaService.user.create({
                        data,
                });

                return user;
        }
}
