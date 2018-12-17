import Services from 'model/services/Services';

export const createAnimal = {
  route: '/create',
  func: async (req, res) => {
    const {
      name,
      species,
      img
    } = req.body;

    const speciesArr = (await Services.Species.getAllEntries({ name: species }));
    if (!speciesArr.length) {
      res.json({
        success: false,
        msg: `Species "${species}" not found`
      });
    } else {
      if (!img) {
        res.json({
          success: false,
          msg: 'Image not specified!'
        });
      }
      const imgUrl = await Services.S3.uploadImage(new Buffer(img, 'binary'), `animal-${name}`);


      const result = await Services.Animal.connection.model.updateOne({
        name,
        species
      }, { img: imgUrl }, { upsert: true, setDefaultsOnInsert: true });

      res.json({
        animal: req.params.animalId,
        success: true,
        result
      });
    }
  }
};
