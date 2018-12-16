import Services from 'model/services/Services';

export const createSpecies = {
  route: '/create',
  func: async (req, res) => {
    const {
      name,
      classification,
      diet,
      appereance,
      behaviour
    } = req.body;

    const { buffer } = req.files[0];

    const imgUrl = await Services.S3.uploadImage(buffer, `species-${name}`);

    const toSave = {
      name,
      img: imgUrl,
      info: {
        classification,
        diet,
        appereance,
        behaviour
      }
    };

    res.json({
      success: true,
      result: await Services.Species.save(toSave)
    });
  }
};
