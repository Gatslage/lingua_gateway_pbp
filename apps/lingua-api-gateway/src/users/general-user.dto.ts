import { PartialType } from "@nestjs/mapped-types";
//import { IsOptional } from "class-validator";

import { IsOptional } from "class-validator";
import { ObjectId } from "typeorm";

export class GeneralUserDto {
    username:string;

    fullname:string;

    email:string;

    password:string;

}

export class OutGeneralUserDto extends PartialType(GeneralUserDto){
    id:ObjectId;

    token:string;

    createdAt:Date;

}

