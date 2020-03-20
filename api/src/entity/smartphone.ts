import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Smartphone extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  released: string;

  @Column()
  imageLink: string;

  @Column()
  design: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  display: number;

  @Column()
  length: number;

  @Column()
  width: number;

  @Column()
  cpu: number;

  @Column()
  updates: number;

  @Column()
  camera: number;

  @Column()
  battery: number;

  @Column()
  batterySize: number;

  @Column()
  sdSlot: number;

  @Column()
  simCards: number;

  @Column({ type: "smallint" })
  notch: number;

  @Column()
  waterproof: number;

  @Column()
  headphoneJack: number;
}
