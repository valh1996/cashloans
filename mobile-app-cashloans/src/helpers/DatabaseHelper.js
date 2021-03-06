const size = 5*1024*1024;
const db = openDatabase('cashloans', '1.0', 'cashloans_database', size);

db.transaction((tx) => {
  tx.executeSql(`
    CREATE TABLE Loans(id INTEGER PRIMARY KEY,
                      borrower_name TEXT NOT NULL, 
                      amount TEXT NOT NULL,
                      note TEXT,
                      loan_date TEXT NOT NULL,
                      returned_date TEXT,
                      returned INTEGER DEFAULT 0,
                      user_id INTEGER,
                      created_at TEXT, 
                      updated_at TEXT,
                      new_record INTEGER DEFAULT 0,
                      edit_record INTEGER DEFAULT 0
    )`,[], () => {}, null);
});

export default db;