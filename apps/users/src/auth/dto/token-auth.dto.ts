import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class TokenUserDto extends PartialType(CreateAuthDto) {
token: string;
}