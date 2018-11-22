'use strict'

const Loan = use('App/Models/Loan')
const { validate } = use('Validator')
const moment = use('moment')

class LoansController {

  /**
   * Get all loans that have been made to a user
   * @param {*}
   */
  async index({auth}) {
    const user = await auth.getUser()
    return await user
      .loans()
      .orderBy('id', 'desc')
      .fetch()
  }

  /**
   * Get the loan by id
   * @param {*})
   */
  async get({params, response}) {
    const loan = await Loan.find(params.id)

    if (loan) {
      return loan
    } else {
      response.status(403).send({ message: 'Unable to recover data to the associed id!' })
    }
  }

  /**
   * Store a new loan
   * @param {*}
   */
  async store({auth, request, response}) {
    const rules = {
      borrower_name: 'required',
      amount: 'required|number',
      note: 'required|max:500',
      loan_date: 'required|date',
    }

    const { borrower_name, amount, note, loan_date } = request.only([
      'borrower_name',
      'amount',
      'note',
      'loan_date'
    ]);
    
    const validator = await validate({ borrower_name, amount, note, loan_date }, rules);

    if (!validator.fails()) {
      try {
        const user_id = await auth.getUser()
                                    .then(data => data.id)

        return await Loan.create({ borrower_name, amount, note, loan_date, user_id });
      } catch (err) {
        response.status(401).send({ error: 'An error occurred!' });
      }
    } else {
      response.status(401).send(validator.messages());
    }
  }

  /**
   * Update an existing loan
   * @param {*}
   */
  async update({params, request, response}) {
    const rules = {
      amount: 'required|number',
      note: 'required|max:500',
      loan_date: 'required|date',
    }

    const { amount, note, loan_date } = request.only([
      'amount',
      'note',
      'loan_date'
    ]);
    
    const validator = await validate({amount, note, loan_date }, rules);

    if (!validator.fails()) {
      try {
        const loan = await Loan.find(params.id)

        if (loan && !loan.returned) {
          loan.amount = amount;
          loan.note = note;
          loan.loan_date = loan_date;

          const updated = await loan.save()
          return response.send({ updated: updated })
        } else {
          return response.status(403).send({ error: 'An error occurred!'})
        }
      } catch (err) {
        response.status(401).send({ error: 'An error occurred!' });
      }
    } else {
      response.status(401).send(validator.messages());
    }
  }

  /**
   * Delete a loan by id
   * @param {*}  
   */
  async delete({params, response}) {
    const loan = await Loan.find(params.id)

    if (loan) {
      const deleted = await loan.delete()
      response.send({ deleted: deleted })
    } else {
      response.status(403).send({ message: 'Unable to delete this loan!' })
    }
  }

  /**
   * Set loan as returned
   * @param {*}
   */
  async return({params, response}) {
    const loan = await Loan.find(params.id)

    if (loan && !loan.returned) {
      loan.returned_date = moment().format("Y-M-D")
      loan.returned = true;

      const returned = await loan.save()
      return response.send({ returned: returned })
    } else {
      response.status(403).send({ message: 'Unable to return this loan!' })
    }
  }
  
}

module.exports = LoansController
