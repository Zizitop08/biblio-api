import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerModule } from './_helper/logger/logger.module'
import { HealthModule } from './_controller/health/health.module'
import { MediaModule } from './_controller/media/media.module'
import { InstallSchema } from './_database/install-schema'
import { UpgradeSchema } from './_database/upgrade-schema'
import { MailModule } from './_helper/mail/mail.module'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { DataBaseConfiguration } from './_config/database.configuration'
import { UserModule } from './_controller/_database/user/user.module'
import { AuthModule } from './_controller/authentification/auth.module'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './_controller/authentification/auth.constants'


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
        LoggerModule,
        MailModule,
        ScheduleModule.forRoot(),
        HealthModule,
        MediaModule,
        TypeOrmModule.forRootAsync({
            useClass: DataBaseConfiguration
        }),
        UserModule,
        AuthModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        InstallSchema,
        UpgradeSchema,
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {

    }
}
