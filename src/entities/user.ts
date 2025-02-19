import { AllUserType } from '@/dtos/enums';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Users {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    login: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({
        type: 'array'
    })
    type: AllUserType[];
}