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
            tx.executeSql('DELETE FROM loans', [], (tx) => {
              data.map(row => {
                tx.executeSql(`INSERT INTO loans 
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
      return new Promise((resolve) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('SELECT * FROM loans', [], (tx, results) => {
            resolve(results.rows)
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
    if (!NetworkHelper.isOnline) {
      return Axios.get(`${API_ENDPOINT}/loans/${id}`)
    } else {
      return new Promise((resolve) => {
        DatabaseHelper.transaction((tx) => {
          tx.executeSql('SELECT * FROM loans WHERE id = ?', [id], (tx, results) => {
            results.rows[0].amount = parseFloat(results.rows[0].amount)
            resolve(results.rows[0])
          });
        });
      })
    }
  },

  /**
   * Allows you to indicate a loan as returned
   * @param {int} id loan identifier
   */
  markLoanAsReturned(id) {
    return Axios.put(`${API_ENDPOINT}/loans/${id}/return`)
  },

  /**
   * Add a new loan to the database
   * @param {object} params 
   */
  add(params) {
    if (!params) {
      params = {};
    }
    
    return Axios.post(`${API_ENDPOINT}/loans`, params)
  },

  /**
   * Update a loan by id
   * @param {object} params 
   */
  update(id, params) {
    if (!params) {
      params = {};
    }
    
    return Axios.put(`${API_ENDPOINT}/loans/${id}`, params)
  },

  /**
   * Delete a loan from database
   * @param {int} id 
   */
  delete(id) {
    return Axios.delete(`${API_ENDPOINT}/loans/${id}`)
  },
}
