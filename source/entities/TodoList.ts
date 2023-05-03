import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class TodoList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  todoName!: string;

  @Column()
  isCompleted!: boolean;
}

export interface Dtodo {
  id: number;
  todoName: string;
  isCompleted: boolean;
}