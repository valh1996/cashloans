'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const API_PREFIX = 'api';

// User group routes
Route
  .group(() => {
    // User auth routes
    Route.get('/', 'UsersController.getCurrent').middleware(['auth'])

    // No auth. routes
    Route.post('login', 'UsersController.login')
    Route.post('signup', 'UsersController.signup')
  })
  .prefix(`${API_PREFIX}/user`)

//Cash loans routes
Route
  .group(() => {

    Route.get('/', 'LoansController.index')
    Route.get('/:id', 'LoansController.get').middleware(['LoanPermission'])

    Route.post('/', 'LoansController.store')
    Route.put('/:id', 'LoansController.update').middleware(['LoanPermission'])
    Route.put('/:id/return', 'LoansController.return').middleware(['LoanPermission'])

    Route.delete('/:id', 'LoansController.delete').middleware(['LoanPermission'])

  })
  .middleware(['auth'])
  .prefix(`${API_PREFIX}/loans`)