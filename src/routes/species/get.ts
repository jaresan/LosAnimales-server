import Services from 'model/services/Services';

export const getSpecies = {
  route: '/',
  func: async (req, res) => {
    res.json(await Services.Species.getAllEntries());
  }
};

export const getByName = {
  route: '/:name',
  func: async (req, res) => {
    const { name } = req.params;

    const species = (await Services.Species.getAllEntries({ name }))[0];
    if (!species) {
      res.json({
        success: false,
        msg: `Species "${name}" not found`
      });
    } else {

      res.json({
        success: true,
        data: species
      });
    }
  }
};
