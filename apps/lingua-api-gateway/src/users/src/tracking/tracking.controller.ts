import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { AddToken } from 'apps/lingua-api-gateway/src/interceptors/authtoken.interceptor';

@Controller('tracking')
@UseInterceptors(AddToken)
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  findAll(@Body() data) {
    return this.trackingService.findAll({sendToken:data.sendToken});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
