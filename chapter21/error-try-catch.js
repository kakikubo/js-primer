// try...catch構文
{
  try {
    console.log("try節:この行は実行されます");
    // 未定義の関数を呼び出してReferenceError例外が発生する
    undefinedFunction();
    // 例外が発生したため、この行は実行されません
  } catch (error) {
    // 例外が発生したあとはこのブロックが実行される
    console.log("catch節:この行は実行されます");
    console.log(error instanceof ReferenceError); // => true
    console.log(error.message); // => undefinedFunction is not defined
  } finally {
    // このブロックは例外の発生に関係なく実行される
    console.log("finally節:この行は実行されます");
  }
}
{
  // catch節のみ
  /*
  try {
    undefinedFunction();
  } catch (error) {
    console.error(error);
  }
  // finally節のみ
  try {
    undefinedFunction();
  } finally {
    console.log("この行は実行されます");
  }
  // finally節のみでは例外がキャッチされないため、この行は実行されません。
  */
}
{
  // 渡された数値が0以上ではない場合に例外を投げる関数
  function assertPositiveNumber(num) {
    if (num < 0) {
      throw new Error(`${num} is not positive.`);
    }
  }

  try {
    // 0未満の値を渡しているので、関数が例外を投げる
    assertPositiveNumber(-1);
  } catch (error) {
    console.log(error instanceof Error); // => true
    console.log(error.message); // => "-1 is not positive."
  }
}
{
  // 文字列を例外として投げるアンチパターンの例
  try {
    throw "例外が投げられました";
  } catch (error) {
    // catch節の例外識別子は投げられた値を参照する
    console.log(error); // => "例外が投げられました"
  }
}
{
  // ビルトインエラー(ReferenceError)
  try {
    // 存在しない変数を参照する
    console.log(x);
  } catch (error) {
    console.log(error instanceof ReferenceError); // => true
    console.log(error.name); // => "ReferenceError"
    console.log(error.message); // エラーメッセージが表示される
  }
}
{
  // ビルトインエラー(SyntaxError)
  try {
    // eval関数は渡した文字列をJavaScriptとして実行する関数
    // 正しくない構文をパースさせ、SyntaxErrorを実行時に発生させる
    eval("foo! bar!");
  } catch (error) {
    console.log(error instanceof SyntaxError); // => true
    console.log(error.name); // => "SyntaxError"
    console.log(error.message); // => Unexpected token '!'
  }
}
{
  // ビルトインエラー(TypeError)
  try {
    // 関数ではないオブジェクトを関数として呼び出す
    const fn = {};
    fn();
  } catch (error) {
    console.log(error instanceof TypeError); // => true
    console.log(error.name); // => "TypeError"
    console.log(error.message); // エラーメッセージが表示される
  }
}
