export const root = {
  route: '/',
  func: async (req, res) => {
    res.json({
      result: 'Api is running'
    });
  }
};
