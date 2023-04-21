import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from "typeorm";

import { Code } from "./Code";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MESS_WORKER = "mess_worker"
}

@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, default:""})
    name: string;

    @Column({ nullable: false, default: 0 })
    breakfast_yearly_no: number;

    @Column({ nullable: false, default: 0 })
    lunch_yearly_no: number;

    @Column({ nullable: false, default: 0 })
    sn_yearly_no: number;

    @Column({ nullable: false, default: 0 })
    sn_day_no: number;

    @Column({ nullable: false, default: 0 })
    sn_month_no: number;

    @Column({ nullable: false, default: 0 })
    din_yearly_no: number;

    @Column({ nullable: false, default: 0 })
    breakfast_month_no: number;

    @Column({ nullable: false, default: 0 })
    lunch_month_no: number;

    @Column({ nullable: false, default: 0 })
    din_month_no: number;

    @Column({ nullable: false, default: 0 })
    breakfast_day_no: number;

    @Column({ nullable: false, default: 0 })
    lunch_day_no: number;

    @Column({ nullable: false, default: 0 })
    din_day_no: number;

    @CreateDateColumn()
    created_at: Date;

}