<template>
  <div>
    <p>お問い合わせフォーム</p>
    <form @submit.prevent="submit">
      <dl>
        <dt>氏名【必須】</dt>
        <dd>
            <input type="text" name="name" size="7" maxlength="51" required v-model="formData.name">
        </dd>
        <dt>性別【必須】</dt>
        <dd>
          <input type="radio" name="gender" value="0" required checked v-model="formData.gender">男性
          <input type="radio" name="gender" value="1" required v-model="formData.gender">女性
          <input type="radio" name="gender" value="2" required v-model="formData.gender">その他
        </dd>
        <dt>生年月日【必須】</dt>
        <dd>
            <input type="date" name="birthday" required v-model="formData.birthday">
        </dd>
        <dt>〒郵便番号【必須】</dt>
        <dd>
          <input type="text" name="postnumber" required v-model="formData.postNumber">
        </dd>
        <dt>住所【必須】</dt>
        <dd>
          <input type="text" name="address" maxlength="201" required v-model="formData.address">
        </dd>
        <dt>電話番号【任意】</dt>
        <dd>
          <input type="tel" name="phone" v-model="formData.phone">
        </dd>
        <dt>メールアドレス【任意】</dt>
        <dd>
          <input type="text" name="email" maxlength="201" v-model="formData.email">
        </dd>
        <dt>お問い合わせの種類【必須】</dt>
        <dd>
            <select name="question1" required v-model="formData.question1">
                <option value="0">新規お取引のご相談</option>
                <option value="1">会社資料請求</option>
                <option value="2">セミナーのご相談</option>
                <option value="3">プログラムのご相談</option>
                <option value="4">広報・取材依頼などのお問い合わせ</option>
                <option value="5">その他</option>
            </select>
        </dd>
        <dt>相談内容【必須】</dt>
        <dd>
            <textarea name="question2" rows="10" cols="50" maxlength="1001" required v-model="formData.question2"></textarea>
        </dd>
      </dl>
      <input type="submit" value="送信" :disabled="!isSubmitButtom">
    </form>
    <p>{{ responseText }}</p>
  </div>
</template>

<script>
export default {
    setup() {
        // フォームに入力されたデータの格納先
        const formData = reactive({
            name: "",
            gender: 2,
            birthday: "",
            postNumber: "",
            address: "",
            phone: "",
            email: "",
            question1: 0,
            question2: ""
        })
        // 送信ボタンの制御用
        const isSubmitButtom = ref(true)
        // 結果表示用
        const responseText = ref("")

        // 送信処理
        const submit = async function () {
            // 送信ボタン無効化 & 結果を空に
            this.isSubmitButtom = false
            this.responseText = ""

            // 送信処理
            const { data, pending, error, refresh } = await useFetch('/api/submit/', {
                method: "POST",
                body: this.formData
            })

            // 送信結果確認
            if (error.value) {
                // エラーの場合
                this.responseText = "エラーが発生しました"
            } else {
                // 成功の場合
                this.formData = {
                    name: "",
                    gender: 2,
                    birthday: "",
                    postNumber: "",
                    address: "",
                    phone: "",
                    email: "",
                    question1: 0,
                    question2: ""
                }

                // 結果を表示
                this.responseText = "お問合せありがとうございます。内容を送信しました。"
            }

            // 送信ボタン有効化 & 入力内容削除
            this.isSubmitButtom = true
        }

        return {
            formData,
            isSubmitButtom,
            responseText,
            submit
        }
    }
};
</script>
