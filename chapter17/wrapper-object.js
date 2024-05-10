{
  // プリミティブ型である文字列からtoUpperCaseメソッドが呼び出せている。
  "string".toUpperCase(); // => "STRING"
}
{
  // "input value"の値をラップしたStringのインスタンスを生成
  const str = String("input value");
  // Stringのインスタンスメソッドである toUpperCase を呼び出す
  str.toUpperCase(); // => "INPUT VALUE"
}
{
  // ラッパーオブジェクト
  // 真偽値 | Boolean
  // 数値   | Number
  // 文字列 | String
  // シンボル | Symbol
}
{
  // プリミティブ型の文字列はstring型
  const str = "文字列";
  console.log(typeof str); // => "string"
  // ラッパーオブジェクトはtypeofで調べると"object"となる
  const stringWrapper = String("文字列");
  console.log(typeof stringWrapper); // => "object"
}
{
  const str = "文字列";
  // プリミティブ型の値に対してメソッド呼び出しを行う
  str.toUpperCase();
  // strへアクセスする際に"string"がラッパーオブジェクトへ変換され、
  // ラッパーオブジェクトはStringのインスタンスなのでメソッドを呼び出せる
  // つまり、上のコードは下のコードと同じ意味となる
  String(str).toUpperCase();
}
{
  const stringWrapper = String("文字列だよ");
  // プリミティブ型の値を取得する
  console.log(stringWrapper.valueOf()); // => "文字列だよ"
}
{
  // ラッパーオブジェクトを明示的に使う理由は無い。常にリテラルを利用するようにするのがよい。
  // OK: リテラルをつかう
  const str = "文字列";
  // NG: ラッパーオブジェクトを使う
  const stringWrapper = String("文字列");
}

// JavaScriptはすべてがオブジェクトである
// ↓ 正確には
// JavaScriptはすべてがオブジェクトのように見える
