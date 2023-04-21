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
import { User } from "./User";

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACKS = "snacks",
}

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sessionId: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: (new Date().getTime() + 2 * 60 * 60 * 1000).toString() })
  expiry_date: String;

  @Column({
    type: "enum",
    enum: MealType,
    default: null,
  })
  role: MealType;

  @ManyToOne(() => User, (user: User) => user.codes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  user: User;
}
