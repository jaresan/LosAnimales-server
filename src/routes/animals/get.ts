import Services from 'model/services/Services';

export const getAnimals = {
  route: '/',
  func: async (req, res) => {
    res.json(await Services.Animal.getAllEntries());
  }
};
