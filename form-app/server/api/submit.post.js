import { pool } from '../db'

export default defineEventHandler(async (event) => {
    // bodyを取得
    const body = await readBody(event)
    let connect, message;
    try {
        // コネクション取得
        connect = await pool.getConnection()

        // 問い合わせ内容保存
        await connect.query(`
            INSERT INTO dataList
            (name, gender, birthday, postnumber, address, phone, email, question1, question2) VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [body.name, body.gender, body.birthday, body.postNumber, body.address, body.phone, body.email, body.question1, body.question2]
        )

        message = "success"
    } catch (err) {
        // エラー処理
        if (err.sqlState == "HY000") {
            // 入力内容が一致しない場合
            setResponseStatus(event, 400)
            message = "一部または全てのデータ型が要件を満たしていません"
            
        } else if (err.sqlState == "23000") {
            // NULLが存在する場合
            setResponseStatus(event, 400)
            message = "必要なデータが足りません"
        } else if (err.sqlState == "22001") {
            // 文字数が長すぎる場合
            setResponseStatus(event, 400)
            message = "一部または全てのデータサイズが要件を満たしていません"
        } else if (err) {
            // 不明エラー
            setResponseStatus(event, 500)
            message = "未定義エラーの発生"
        }
    }
    
    // コネクション開放
    if (connect) { connect.release() };

    // 結果の返送
    return {
        message: message
    }
})
