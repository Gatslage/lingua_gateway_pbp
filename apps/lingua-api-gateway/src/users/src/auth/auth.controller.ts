import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GeneralUserDto } from '../../general-user.dto';
import { AddToken } from 'apps/lingua-api-gateway/src/interceptors/authtoken.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  register(@Body() newUser: GeneralUserDto) {
    return this.authService.register(newUser);
  }

  
}

@Controller('auth')
@UseInterceptors(AddToken)
export class OtherAuthController{
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(@Body() data) {
    return this.authService.findAll({sendToken:data.sendToken});
  } 

  @Get(':id')
  findOne(@Param('id') id: string,@Body() data) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
