import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthLibraryModule } from '@app/auth-library';

@Module({
  imports:[AuthLibraryModule,TypeOrmModule.forFeature([User],'mongodb_user')],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
