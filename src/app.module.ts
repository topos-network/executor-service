import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'

import { AuthModule } from './auth/auth.module'
import { ExecuteModuleV1 } from './execute/execute.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    ExecuteModuleV1,
  ],
})
export class AppModule {}
