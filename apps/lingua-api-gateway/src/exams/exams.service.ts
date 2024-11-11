import { Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ExamsService {
  constructor(@Inject('EXAMS_CLIENT') private examclient:ClientProxy){}

  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  findAll(data) {
    return this.examclient.send('exams.findAll',data);
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
