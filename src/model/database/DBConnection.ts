import * as mongoose from 'mongoose';

// db.flats.createIndexes([{gps:'2dsphere'}, {price: 1}, {surface: 1}])

export default class DBConnection {
  static async connect(dbUrl: string) {
    return mongoose.connect(dbUrl, { useNewUrlParser: true });
  }

  static getInstance(model) {
    return new DBConnection(model);
  }

  constructor(public model: mongoose.Model<any>) {}

  async getAllEntries(filter, fields) {
    return this.model.find(filter, fields).sort({ _id : -1 });
  }

  async updateOne(filter, fields) {
    return this.model.updateOne(filter, fields);
  }

  async save(data) {
    if (Array.isArray(data)) {
      return this.model.insertMany(data);
    }
    return new this.model(data).save();
  }
}
