import Service from 'model/services/Service';
import { User, Animal, Species } from 'model/entities';

export default class Services {
  static User: Service<User>;
  static Animal: Service<Animal>;
  static Species: Service<Species>;

  static initialize(dbConnection) {
    this.User = new Service(dbConnection.getInstance(User));
    this.Animal = new Service(dbConnection.getInstance(Animal));
    this.Species = new Service(dbConnection.getInstance(Species));
  }
}
