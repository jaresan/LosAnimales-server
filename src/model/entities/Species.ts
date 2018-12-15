import * as mongoose from 'mongoose';

const r = type => ({
  type,
  required: true
});

export interface Species {
  name: string,
  img?: string
}

interface ISpecies extends Species, mongoose.Document {}

const SpeciesSchema: any = new mongoose.Schema({
  name: r(String),
  img: String
});

export const Species = mongoose.model<ISpecies>('Species', SpeciesSchema);
