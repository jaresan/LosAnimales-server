import Services from 'model/services/Services';

export const createSpecies = {
  route: '/create',
  func: async (req, res) => {
    const {
      name,
      classification,
      diet,
      appearance,
      behaviour,
      thumbnail,
      detail,
      description,
      location
    } = req.body;

    try {
      const toSave = {
        $set: {
          name,
          info: {
            classification,
            diet,
            appearance,
            behaviour,
            description,
            location
          }
        }
      };

      if (thumbnail) {
        toSave['$set']['thumbnailImg'] = await Services.S3.uploadImage(new Buffer(thumbnail, 'binary'), `species-thumbnail-${name}`);
      }
      if (detail) {
        toSave['$set']['detailImg'] = await Services.S3.uploadImage(new Buffer(detail, 'binary'), `species-detail-${name}`);
      }

      const result = await Services.Species.connection.model.updateOne({
        name
      }, toSave, { upsert: true, setDefaultsOnInsert: true });

      res.json({
        success: true,
        result
      });
    } catch (error) {
      res.json({ error });
    }
  }
};
