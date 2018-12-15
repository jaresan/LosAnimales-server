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
      res.json({
        animal: req.params.animalId,
        success: true,
        result: await Services.Animal.save({
          name,
          species,
          img
        })
      });
    }
  }
};
