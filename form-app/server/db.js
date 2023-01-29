import { createConnection } from 'mysql2'
import { createPool } from 'mysql2/promise'


// データベース設定
const config = {
    host: 'db',
    user: 'dbuser',
    password: "1234",
    database: "sampledb"
}

// データベースのプールを作る
const pool = createPool(config);

// コネクション取得
const connection = createConnection(config)
connection.connect()

// テーブルが存在するか確認する
connection.query(`SHOW TABLES LIKE "dataList";`, (err, rows) => {
    if (err) throw err;
    // テーブルが存在しない
    if (rows.length === 0) {
        // // テーブルを作成する
        connection.query(`CREATE TABLE dataList (id INTEGER(11) AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, gender INTEGER(1) NOT NULL, birthday DATE NOT NULL, postNumber INTEGER(7) NOT NULL, address VARCHAR(200) NOT NULL, phone VARCHAR(11), email VARCHAR(200), question1 INTEGER(1) NOT NULL, question2 TEXT(1000) NOT NULL, PRIMARY KEY(id));`, (err, rows) => {
            if (err) throw err;
        })
    }
})

export { pool };
