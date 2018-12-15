export const getAnimals = {
  route: '/:animalId',
  func: async (req, res) => {
    res.json({
      animal: req.params.animalId,
      success: true
    });
  }
};
