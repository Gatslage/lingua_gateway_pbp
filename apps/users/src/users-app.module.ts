import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './schemas/schema.models';
import { UsersModule } from './users/users.module';
import { TrackingModule } from './tracking/tracking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserAuth } from './auth/entities/auth.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  //imports: [TrackingModule, UsersModule,MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  imports: [  ConfigModule.forRoot({envFilePath: './apps/users/user.env',isGlobal:true,}),TrackingModule,AuthModule, UsersModule,
    TypeOrmModule.forRoot(
      {type: 'postgres',
        host:process.env.HOST_POSTGRES || 'localhost',
        port:Number(process.env.PORT_POSTGRES) || 5432,
        username:process.env.USERNAME_POSTGRES || 'lingua',
        password:process.env.PASSWORD_POSTGRES || 'lingua',
        database:process.env.DATABASE_POSTGRES || 'lingua',
        entities: [UserAuth]
      }
    ), TypeOrmModule.forRoot(
    {
      type: 'mongodb',
      host: process.env.HOST_MONGO || 'localhost',
      port: Number(process.env.PORT_MONGO) || 27017,
      database:process.env.DATABASE_MONGO || 'User',
      name:'mongodb_user',
      entities:[User]
    }
  ),
],
  controllers: [],
  providers: [],
})

export class UsersAppModule {}
