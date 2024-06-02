import { PrimaryGeneratedColumn } from 'typeorm';
export function CustomIdColumn(nameId: string): PropertyDecorator {
  return PrimaryGeneratedColumn({ name: nameId });
}
