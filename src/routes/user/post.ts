import Services from 'model/services/Services';
import * as sha1 from 'sha1';

export const signup = {
  route: '/signup',
  func: async (req, res) => {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;

    try {
      const user = (await Services.User.getAllEntries({ email }));
      if (user.length) {
        res.json({
          success: false,
          msg: `User "${email}" already registered`
        });
      } else {
        const userData = {
          email,
          firstName,
          lastName
        };
        const result = await Services.User.save({
          email,
          password: sha1(password),
          firstName,
          lastName
        });

        res.json({
          success: true,
          result,
          userData
        });
      }
    } catch (error) {
      res.status(500).send({
        error
      });
    }
  }
};

export const login = {
  route: '/login',
  func: async (req, res) => {
    const {
      email,
      password
    } = req.body;

    try {
      const users = (await Services.User.getAllEntries({
        email,
        password: sha1(password)
      }));

      if (!users.length) {
        res.json({
          success: false,
          msg: `Username or password incorrect.`
        });
      } else {
        const userData = users[0];
        res.json({
          success: true,
          data: userData
        });
      }
    } catch (error) {
      res.status(500).send({
        error
      });
    }
  }
};
