import * as mongoose from 'mongoose';

const r = type => ({
  type,
  required: true
});

export interface Animal {
  name: string,
  species: string,
  img?: string
}

interface IAnimal extends Animal, mongoose.Document {}

const AnimalSchema: any = new mongoose.Schema({
  name: r(String),
  species: r(String),
  img: String
});

export const Animal = mongoose.model<IAnimal>('Animal', AnimalSchema);
