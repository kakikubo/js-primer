// 現在の時刻をインスタンス化する
{
  // 現在の時刻を表すインスタンスを作成する
  const now = new Date();
  // 時刻値だけがほしい場合にはDate.now()メソッドを使う
  console.log(Date.now()); // => 1697145320955

  // 時刻値を取得する
  console.log(now.getTime()); // => 1697145320955
  // 時刻をISO8601形式の文字列で表示する
  console.log(now.toISOString()); // => 2023-10-12T21:15:20.955Z
}

// 任意の時刻をインスタンス化する
{
  // 時刻のミリ秒値を直接指定する形式
  // 1136214245999はUTCにおっける2006年1月2日15時4分5秒999ミリ秒を表す
  const date = new Date(1136214245999);
  // 末尾の'Z'はUTCであることを表す
  console.log(date.toISOString()); // => 2006-01-02T15:04:05.999Z
}
{
  // UTCにおける"2006年1月2日15時04分05秒999ミリ秒"を表すISO8601形式の文字列
  const inUTC = new Date("2006-01-02T15:04:05.999Z");
  console.log(inUTC.toISOString()); // => 2006-01-02T15:04:05.999Z

  // Asia/Tokyo(+09:00)で実行すると、UTCにおける表記は9時間前の06時04分05秒になる
  // 上記の例とは異なり、UTCであることを表す'Z'がついていないことに注意
  const inLocal = new Date("2006-01-02T15:04:05.999");
  console.log(inLocal.toISOString()); // => 2006-01-02T06:04:05.999Z Asia/Tokyo(+09:00)で実行した場合
}
{
  // この方法はローカルのタイムゾーンに依存するため、推奨されない
  // 実行環境における"2006年1月2日15時04分05秒999ミリ秒"を表す
  // タイムゾーンを指定する事はできない
  const date1 = new Date(2006, 0, 2, 15, 4, 5, 999);
  console.log(date1.toISOString()); // => 2006-01-02T06:04:05.999Z Asia/Tokyo(+09:00)で実行した場合

  // Date.UTCメソッドを使うとUTCに固定できる
  const ms = Date.UTC(2006, 0, 2, 15, 4, 5, 999);
  // 時刻値を渡すコンストラクタと併用する
  const date2 = new Date(ms);
  console.log(date2.toISOString()); // => 2006-01-02T15:04:05.999Z
}
{
  // 不正なDateインスタンスを作成する
  const invalid = new Date("");
  console.log(invalid.getTime()); // => NaN
  console.log(invalid.toString()); // => "Invalid Date"
}

// Dateインスタンスのメソッド
{
  // YYYY/MM/DD形式の文字列に変換する関数
  function formatDate(date) {
    const yyyy = String(date.getFullYear());
    // String#padStartメソッド(ES2017)で2桁になるように0埋めする
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  }

  const date = new Date("2006-01-02T15:04:05.999");
  console.log(formatDate(date));
}
{
  // getTimezoneOffsetはインスタンスメソッドなのでインスタンスが必要
  const now = new Date();
  // 時間単位にしたタイムゾーンオフセット
  const timezoneOffsetInHours = now.getTimezoneOffset() / 60;
  // UTCの現在の時間を計算できる
  console.log(`Hours in UTC: ${now.getHours() + timezoneOffsetInHours}`); // => Hours in UTC: -3 ←つまり24 -3 = 21時
}
/**
{
  // moment.jsで現在時刻のmomentオブジェクトを作る
  const now = moment();
  // addメソッドで10分進める
  const future = now.add(10, "minutes");
  // formatメソッドで任意の書式の文字列に変換する
  console.log(future.format("YYYY/MM/DD")); // => "2021/10/12"
}
 */
