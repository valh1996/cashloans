'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UsersController {

  /**
   * Performs user authentification
   * @param {*}
   */
  async login({auth, request, response}) {
    const rules = {
      email: 'required|email',
      password: 'required'
    };

    const { email, password } = request.only(['email', 'password']);
    const validator = await validate({ email, password }, rules);

    if (!validator.fails()) {
      try {
        return await auth.withRefreshToken().attempt(email, password);
      } catch (err) {
        response.status(401).send({ error: 'Invalid address e-mail or username!' });
      }
    } else {
      response.status(401).send(validator.messages());
    }
  }

  /**
   * Performs user registration
   * @param {*}
   */
  async signup({auth, request, response}) {
    const rules = {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    };

    const { email, username, password } = request.only([
      'username',
      'email',
      'password'
    ]);

    const validator = await validate({ email, username, password }, rules);

    if (!validator.fails()) {
      try {
        const user = await User.create({ username, email, password });
        return await auth.withRefreshToken().attempt(email, password);
      } catch (err) {
        response.status(401).send({ error: 'An error occurred!' });
      }
    } else {
      response.status(401).send(validator.messages());
    }
  }

  /**
   * Get the authentificated user
   * @param {*} 
   */
  async getCurrent({auth}) {
    return await auth.getUser()
  }

  /**
   * Logout the current authentificated user
   * @param {*}
   */
  async logout({auth, response}) {
    try {
      const user = await auth.getUser()
      return await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)
    } catch (err) {
      response.status(401).send({ error: 'something went wrong' });
    }
}

}

module.exports = UsersController
