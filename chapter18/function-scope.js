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

// メモリ管理の仕組み
{
  let x = "before text";
  // 変数`x`に新しいデータを入れる
  x = "after text";
  // このとき"before text"というデータはどこからも参照されなくなる
  // その後、ガベージコレクションによってメモリ上から開放される
}

// 関数の実行が終了した際に開放される場合
{
  function printX() {
    const x = "X";
    console.log(x);
  }
  printX(); // => "X"
  // この時点で”X"を参照するものはなくなる→開放される
}

// 関数の実行が終了しても開放されない場合
{
  function createArray() {
    const tempArray = [1, 2, 3];
    return tempArray;
  }
  const array = createArray();
  console.log(array); // => [1, 2, 3]
  // 変数`array`が[1,2,3]という値を参照している→開放されない
}

// 改めてクロージャー
{
  const createCounter = () => {
    let count = 0;
    return function increment() {
      // 変数`count`を参照し続けている
      count = count + 1;
      return count;
    };
  };
  // countUpとnewCountUpはそれぞれ別のincrement関数(内側にあるのも別のcount変数)
  const countUp = createCounter();
  const newCountUp = createCounter();
  // 参照している関数(オブジェクト)は別であるため===は一致しない
  console.log(countUp === newCountUp); // false
  // それぞれの状態も別となる
  console.log(countUp()); // => 1
  console.log(newCountUp()); // => 1
}
{
  const createCounter = () => {
    // 外のスコープから`privateCount`を直接参照できない
    let privateCount = 0;
    return () => {
      privateCount++;
      return `${privateCount}回目`;
    };
  };
  const counter = createCounter();
  console.log(counter()); // => "1回目"
  console.log(counter()); // => "2回目"
}
// 高階関数(関数を返す関数)
{
  function greaterThan(n) {
    return function (m) {
      return m > n;
    };
  }
  // 5より大きな値かを判定する関数を作成する
  const greaterThan5 = greaterThan(5);
  console.log(greaterThan5(4)); // => false
  console.log(greaterThan5(5)); // => false
  console.log(greaterThan5(6)); // => true
}

// 関数はオブジェクトである…という事を利用して、関数にプロパティをもたせて上記の
// クロージャーと同じ事を実現できる(しかし、後述の※により推奨されない)
{
  function countUp() {
    // countプロパティを参照して変更する
    countUp.count = countUp.count + 1;
    return countUp.count;
  }
  // 関数オブジェクトにプロパティとして値を代入する
  countUp.count = 0;
  // 呼び出すごとにcountが更新される
  console.log(countUp()); // => 1
  console.log(countUp()); // => 2
  // 直接値を変更できてしまう。※クロージャーならこれはできない
  countUp.count = 10;
  console.log(countUp()); // => 11
}
