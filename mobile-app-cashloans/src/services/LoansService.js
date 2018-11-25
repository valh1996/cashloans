import Axios from 'axios'
import NetworkHelper from '../helpers/NetworkHelper'
import DatabaseHelper from '../helpers/DatabaseHelper'

const API_ENDPOINT = (process.env.NODE_ENV !== 'production')
    ? process.env.VUE_APP_API_ENDPOINT_DEV
    : process.env.VUE_APP_API_ENDPOINT_PROD

export default {
  /**
   * Get all loans from API
   */
  getAll(){
    if (NetworkHelper.isOnline) {
      return Axios.get(`${API_ENDPOINT}/loans`)
        .then(res => {
          let data = res.data;
          //cache data for offline mode
          DatabaseHelper.transaction((tx) => {
            tx.executeSql('DELETE FROM Loans', [], (tx) => {
              data.map(row => {
                tx.executeSql(`INSERT INTO Loans 
                                (id, borrower_name, amount, note, loan_date, returned_date, returned, user_id, created_at, updated_at) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                                  row.id,
                                  row.borrower_name,
                                  row.amount,
                                  row.note,
                                  row.loan_date,
                                  row.returned_date,
                                  row.returned,
                                  row.user_id,
                                  row.created_at,
                                  row.updated_at
                              ]);
              })
            });
          });
            
          return data;
        })
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('SELECT * FROM Loans ORDER BY id DESC', [], (tx, results) => {
            resolve(results.rows)
          }, (tx, err) => {
            reject(err.message)
          });
        });
      })      
    }
  },

  /**
   * Get a Loan its identifier
   * @param {int} id loan identifier
   */
  getById(id) {
    if (NetworkHelper.isOnline) {
      return Axios.get(`${API_ENDPOINT}/loans/${id}`)
        .then(res => res.data)
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('SELECT * FROM Loans WHERE id = ?', [id], (tx, results) => {
            results.rows[0].amount = parseFloat(results.rows[0].amount)
            resolve(results.rows[0])
          });
        }, (tx, err) => {
          reject(err.message)
        });
      })
    }
  },

  /**
   * Allows you to indicate a loan as returned
   * @param {int} id loan identifier
   */
  markLoanAsReturned(id) {
    if (NetworkHelper.isOnline) {
      return Axios.put(`${API_ENDPOINT}/loans/${id}/return`)
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('UPDATE Loans SET returned = ?, edit_record = ? WHERE id = ?;', [1, 1, id], (tx, results) => {
            resolve(results)
          }, (tx, err) => {
            reject(err.message)
          });
        });
      })
    }
  },

  /**
   * Add a new loan to the database
   * @param {object} params 
   */
  add(params) {
    if (!params) {
      params = {};
    }

    if (NetworkHelper.isOnline) {
      return Axios.post(`${API_ENDPOINT}/loans`, params)
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql(`INSERT INTO Loans 
                                    (borrower_name, amount, note, loan_date, new_record) 
                                    VALUES (?, ?, ?, ?, ?)`, [
                                      params.borrower_name,
                                      params.amount,
                                      (params.note) ? params.note : '',
                                      params.loan_date,
                                      1
                                  ], () => {
                                    resolve('Loan inserted!')
                                  }, (tx, err) => {
                                    reject(err.message)
                                  });
        });
      })
    }
  },

  /**
   * Update a loan by id
   * @param {object} params 
   */
  update(id, params) {
    if (!params) {
      params = {};
    }
    
    if (NetworkHelper.isOnline) {
      return Axios.put(`${API_ENDPOINT}/loans/${id}`, params)
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('UPDATE Loans SET amount = ?, note = ?, loan_date = ?, edit_record = ? WHERE id = ?;', 
            [params.amount, params.note, params.loan_date, 1, id], (tx, results) => {
              resolve(results)
          }, (tx, err) => {
            reject(err.message)
          });
        });
      })
    }
  },

  /**
   * Delete a loan from database
   * @param {int} id 
   */
  delete(id) {
    if (NetworkHelper.isOnline) {
      return Axios.delete(`${API_ENDPOINT}/loans/${id}`)
    } else {
      return new Promise((resolve, reject) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('DELETE FROM Loans WHERE id = ?', 
            [id], (tx, results) => {
              resolve(results)
          }, (tx, err) => {
            reject(err.message)
          });
        });
      })
    }

  },
}
