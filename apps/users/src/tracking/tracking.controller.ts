import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller()
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @MessagePattern('createTracking')
  create(@Payload() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @MessagePattern('findAllTracking')
  findAll() {
    return this.trackingService.findAll();
  }

  @MessagePattern('findOneTracking')
  findOne(@Payload() id: number) {
    return this.trackingService.findOne(id);
  }

  @MessagePattern('updateTracking')
  update(@Payload() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(updateTrackingDto.id, updateTrackingDto);
  }

  @MessagePattern('removeTracking')
  remove(@Payload() id: number) {
    return this.trackingService.remove(id);
  }
}
