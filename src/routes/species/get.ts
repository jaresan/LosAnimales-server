import Services from 'model/services/Services';

export const getSpecies = {
  route: '/',
  func: async (req, res) => {
    res.json(await Services.Species.getAllEntries());
  }
};
