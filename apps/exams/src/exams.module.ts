import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { LoggerModule } from 'nestjs-pino';
import { AuthLibraryModule } from '@app/auth-library';

@Module({
  imports: [AuthLibraryModule,LoggerModule.forRoot({
    pinoHttp: {
      customProps: (req, res) => ({
        context: 'HTTP',
      }),
      transport: {pipeline:[{
        target: 'pino-pretty',
      },{
        target:'pino/file',
        options:{ destination: `./logs/app.log` },
      }]
      },
    },
})],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
