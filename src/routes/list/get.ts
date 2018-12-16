import Services from 'model/services/Services';

export const getAll = {
  route: '/',
  func: async (req, res) => {
    res.json({
      animals: await Services.Animal.getAllEntries(),
      species: await Services.Species.getAllEntries()
    });
  }
};
