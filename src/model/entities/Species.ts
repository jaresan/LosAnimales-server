import * as mongoose from 'mongoose';

const r = type => ({
  type,
  required: true
});

export interface Species {
  name: string,
  thumbnailImg: string,
  detailImg: string,
  info: object
}

interface ISpecies extends Species, mongoose.Document {}

const SpeciesSchema: any = new mongoose.Schema({
  name: r(String),
  thumbnailImg: r(String),
  detailImg: r(String),
  info: r(Object)
});

export const Species = mongoose.model<ISpecies>('Species', SpeciesSchema);
