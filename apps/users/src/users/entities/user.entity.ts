import { ObjectId, ObjectIdColumn, Column, Entity } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id:ObjectId;

    @Column()
    username:string;

    @Column()
    fullname:string;

    @Column()
    email:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}


