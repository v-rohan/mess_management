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
  MESS_WORKER = "mess_worker",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  dept: string;

  @Column({ nullable: true })
  roll: string;

  @Column({ nullable: true })
  regNo: string;

  @Column({ nullable: true })
  hall: string;

  @Column({ nullable: false, default: false })
  codeBlock: Boolean;

  @Column({ nullable: true })
  designation: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ nullable: true, default: null })
  gender: string;

  @OneToMany(() => Code, (Code) => Code.user)
  codes: Code[];

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: false, default: 20 })
  break_no: number;

  @Column({ nullable: false, default: 20 })
  lunch_no: number;

  @Column({ nullable: false, default: 20 })
  din_no: number;

  @Column({ nullable: false, default: 20 })
  sn_no: number;

  @Column({ nullable: false, default: false })
  profileDone: Boolean;

  // @OneToOne(() => Verify, (verify) => verify.id)
  // verify: Verify;
}

// @Entity()
// export class Verify {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @OneToOne(() => User, (user) => user.id, {
//         cascade: true,
//         // onDelete: "NO ACTION",
//         // onUpdate: "NO ACTION",
//         // nullable: false,
//     })
//     @JoinColumn()
//     user: User;

//     @Column({ type: "varchar", length: 128, nullable: false })
//     verify_hash: string;
// }
