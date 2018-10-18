'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LoanPermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, params, response }, next) {

    const user = await auth.getUser()
    const loans = await user.loans().fetch()
    const canAccess = loans.rows.filter(loan => loan.id == params.id)

    if (!canAccess === undefined || !canAccess.length == 0) {
      await next()
    } else {
      return response.status(401).send({ message: 'You do not have permission to access these loans' });
    }

  }
}

module.exports = LoanPermission
