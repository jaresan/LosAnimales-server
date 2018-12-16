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

    const filesByName = req.files.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {});

    const thumbnailImg = await Services.S3.uploadImage(filesByName.thumbnail.buffer, `species-thumbnail-${name}`);
    const detailImg = await Services.S3.uploadImage(filesByName.detail.buffer, `species-detail-${name}`);

    const toSave = {
      name,
      thumbnailImg,
      detailImg,
      info: {
        classification,
        diet,
        appereance,
        behaviour
      }
    };

    const result = await Services.Species.connection.model.updateOne({
      name
    }, toSave, { upsert: true, setDefaultsOnInsert: true });

    res.json({
      success: true,
      result
    });
  }
};
