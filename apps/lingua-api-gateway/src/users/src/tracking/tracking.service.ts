import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TrackingService {
  constructor(@Inject('USERS_CLIENT') private TrackingClient: ClientProxy){}
  private Log = new Logger("Service: "+TrackingService.name)
  
  create(createTrackingDto: CreateTrackingDto) {
    return 'This action adds a new tracking';
  }

  findAll(data) {
    return this.TrackingClient.send('users.tracking.findAll',data);
  }

  findOne(id: number) {
    return `This action returns a #${id} tracking`;
  }

  update(id: number, updateTrackingDto: UpdateTrackingDto) {
    return `This action updates a #${id} tracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
