import Service from 'model/services/Service';
import { User, Animal, Species } from 'model/entities';
import * as AWS from 'aws-sdk';

export default class Services {
  static User: Service<User>;
  static Animal: Service<Animal>;
  static Species: Service<Species>;
  static S3;

  static initialize(dbConnection) {
    this.User = new Service(dbConnection.getInstance(User));
    this.Animal = new Service(dbConnection.getInstance(Animal));
    this.Species = new Service(dbConnection.getInstance(Species));
    this.S3 = new AWS.S3({
      secretAccessKey: process.env.AWS_SECRET,
      accessKeyId: process.env.AWS_ACCESS_KEY
    });
    this.extendS3();
  }

  static extendS3() {
    this.S3.uploadImage = (img, name) =>
      new Promise((res, err) => {
        this.S3.upload({
          Bucket: process.env.AWS_BUCKET,
          Key: `${name}.png`,
          Body: img,
          ContentType: 'image/png',
          CacheControl: 'max-age=31557600',
          ACL: 'public-read'
        }, (error, data) => {
          if (error) {
            err(error);
          } else {
            res(data.Location);
          }
        });
      });
  }
}
