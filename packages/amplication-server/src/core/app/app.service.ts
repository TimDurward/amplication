import { Injectable } from '@nestjs/common';
import { App, User } from 'src/models';
import { PrismaService } from 'src/services/prisma.service';

import { CreateOneAppArgs, FindManyAppArgs, UpdateOneAppArgs } from './dto';
import { FindOneArgs } from 'src/dto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create app in the user's organization
   */
  async createApp(args: CreateOneAppArgs, user: User): Promise<App> {
    return this.prisma.app.create({
      data: {
        ...args.data,
        organization: {
          connect: {
            id: user.organization.id
          }
        }
      }
    });
  }

  async app(args: FindOneArgs): Promise<App | null> {
    return this.prisma.app.findOne(args);
  }

  async apps(args: FindManyAppArgs): Promise<App[]> {
    return this.prisma.app.findMany(args);
  }

  async deleteApp(args: FindOneArgs): Promise<App | null> {
    return this.prisma.app.delete(args);
  }

  async updateApp(args: UpdateOneAppArgs): Promise<App | null> {
    return this.prisma.app.update(args);
  }
}