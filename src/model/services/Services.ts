import Service from 'model/services/Service';
import { User } from 'model/entities';

export default class Services {
  static User: Service<User>;

  static initialize(dbConnection) {
    this.User = new Service(dbConnection.getInstance(User));
  }
}
