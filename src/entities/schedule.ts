import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { Percentage, ScheduleSubject } from '@/dtos/enums';

@Entity()
export class Schedules {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    location: string;

    @Column()
    startsAt: Date;

    @Column()
    endsAt: Date;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({ type: 'float' })
    value: number;

    @Column({ type: 'enum', enum: ScheduleSubject })
    subject: ScheduleSubject;

    @Column({ type: 'enum', enum: Percentage })
    percentage: Percentage;

    @Column()
    customerId: string;

    @Column()
    teacherId: string;
}