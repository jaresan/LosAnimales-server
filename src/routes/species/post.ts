import Services from 'model/services/Services';

export const createSpecies = {
  route: '/create',
  func: async (req, res) => {
    res.json({
      animal: req.params.animalId,
      success: true,
      result: await Services.Species.save(req.body)
    });
  }
};
