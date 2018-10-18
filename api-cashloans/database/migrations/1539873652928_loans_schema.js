'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoansSchema extends Schema {
  up () {
    this.create('loans', (table) => {
      table.increments()
      table.string('borrower_name', 45).notNullable()
      table.decimal('amount').notNullable()
      table.text('note')
      table.date('loan_date').notNullable()
      table.date('returned_date')
      table.boolean('returned').defaultTo(0).notNullable()

      table.integer('user_id').unsigned().index('user_id')
      table.foreign('user_id').references('users.id')

      table.timestamps()
    })
  }

  down () {
    this.drop('loans')
  }
}

module.exports = LoansSchema
