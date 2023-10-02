{
  function fn() {
    const x = 1;
    // fn関数のスコープ内からxは参照できる
    console.log(x); // => 1
  }
  fn();
  // fn関数のスコープ外からxは参照できないためエラー
  // console.log(x); // => ReferenceError: x is not defined
}

//仮引数においても同じこと
{
  function fn(arg) {
    // fn関数のスコープ内からargは参照できる
    console.log(arg); // => 1
  }
  fn(1);
  // fn関数のスコープ外からargは参照できないためエラー
  // console.log(arg); // => ReferenceError: arg is not defined
}

{
  // OUTERブロックスコープ
  const x = "x";
  {
    // INNERブロックスコープからOUTERブロックスコープの変数を参照できる
    console.log(x); // => "x"
  }
}

{
  // OUTERブロックスコープ
  const x = "outer";
  {
    // INNERブロックスコープ
    const x = "inner";
    // 現在のスコープ(INNERブロックスコープ)にあるxを参照する
    console.log(x); // => "inner"
  }
  // 現在のスコープ(OUTERブロックスコープ)にあるxを参照する
  console.log(x); // => "outer"
}

// ビルトインオブジェクトはどこからでも参照できる
console.log(isNaN); // => function isNaN() { [native code] }
console.log(Array); // => function Array() { [native code] }
{
  // "Array"という名前の変数を定義(変数の隠蔽/Shadowing)
  const Array = 1;
  // 自分で定義した変数がビルトインオブジェクトより優先される
  console.log(Array); // => 1
}

{
  // 関数の巻き上げにより、後で定義した関数も呼び出せる
  hello(); // => "Hello"

  function hello() {
    return "Hello";
  }
}

{
  // クロージャー
  // increment関数を定義して返す関数
  function createCounter() {
    let count = 0;
    // increment関数はcount変数を参照
    function increment() {
      count = count + 1;
      return count;
    }
    return increment;
  }
  // MyCounterはcreateCounterが返した関数を参照
  const myCounter = createCounter();
  console.log(myCounter()); // => 1
  console.log(myCounter()); // => 2
  // 新しくnewCounterを定義する
  const newCounter = createCounter();
  console.log(newCounter()); // => 1
  console.log(newCounter()); // => 2
  // myCounterとnewCounterは別々の状態を持っている
  console.log(myCounter()); // => 3
  console.log(newCounter()); // => 3
}
{
  // JavaScriptは静的スコープを採用している
  const x = 10; // ※1

  function printX() {
    // この識別子xは常に※1の変数xを参照する
    console.log(x);
  }
  function run() {
    const x = 20;
    printX(); // 常に10が出力される
  }
  run();
}
