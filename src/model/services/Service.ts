export default class Service<T> {
  constructor(private connection) {}

  async getAllEntries(filter?: object, fields?: object): Promise<T[]> {
    return await this.connection.getAllEntries(filter, fields);
  }

  async save(data: T | T[]): Promise<T> {
    return await this.connection.save(data);
  }

  async updateOne(filter, fields) {
    return await this.connection.updateOne(filter, fields);
  }
}
