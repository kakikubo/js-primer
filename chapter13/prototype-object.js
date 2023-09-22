// Object.prototype オブジェクトにtoStringメソッドの定義がある。toStringはプロトタイプメソッド。
console.log(typeof Object.prototype.toString); // "function"

// objインスタンスはObject.prototypeに定義されたものを継承する
// obj.toStringは継承したObject.prototype.toStringを参照している
{
  const obj = {};
  console.log(obj.toString === Object.prototype.toString); // true
  // インスタンスからプロトタイプメソッドを呼び出せる(プロトタイプチェーン)
  console.log(obj.toString()); // [object Object]
}

// オブジェクトのインスタンスにtoStringメソッドを定義
{
  const customObject = {
    toString() {
      return "custom value";
    },
  };
  // customObject.toStringは独自のものを参照する
  console.log(customObject.toString()); // "custom value"
}

/*
 * in演算子とObject#hasOwnPropertyメソッドの違い
 */
{
  const obj = {};
  // objというオブジェクト自体にtoStringメソッドが定義されているわけではない
  console.log(obj.hasOwnProperty("toString")); // false
  // in演算子は指定されたプロパティ名が見つかるまで親をたどるため、Object.prototypeまで見にいく
  console.log("toString" in obj); // true
}
{
  console.log("オブジェクトのインスタンスにtoStringメソッドを定義");
  const obj = {
    toString() {
      return "custom value";
    },
  };
  // オブジェクトのインスタンスがtoStringメソッドを持っている
  console.log(obj.hasOwnProperty("toString")); // true
  console.log("toString" in obj); // true
}

//オブジェクトの継承元を明示するObject.createメソッド
{
  // const obj = {};と同じ意味
  const obj = Object.create(Object.prototype);
  console.log("objはObject.prototypeを継承している");
  console.log(obj.hasOwnProperty === Object.prototype.hasOwnProperty); // true
}

// 「Arrayの継承関係」
// Arrayのインスタンス -> Array.prototype -> Object.prototype
{
  // 注※ このコードはイメージです
  // Arrayコンストラクタ自信は関数でもある
  const Array = function () {};
  // Array.prototypeはObject.prototypeを継承している
  Array.prototype = Object.create(Object.prototype);
  // ArrayインスタンスはArray.prototypeを継承している
  const array = Object.create(Array.prototype);
  // arrayはObject.prototypeを継承している
  console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // true
}
{
  const array = [];
  console.log("Arrayのインスタンス -> Array.prototype -> Object.prototype");
  console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // true
}

// Array#toString
{
  const numbers = [1, 2, 3];
  // Array#toStringが定義されているため、Object#toStringとは異なる形式となる
  console.log(numbers.toString()); // "1,2,3"
}

// Object.prototypeを継承しないオブジェクト
{
  // 親がnull、つまり親がいないオブジェクトを作成
  const obj = Object.create(null);
  // Object.prototypeを継承していないため、hasOwnPropertyメソッドは存在しない
  console.log(obj.hasOwnProperty); // undefined
}

// ES2015以前のMap的なオブジェクト
{
  const obj = {};
  // "toString"という値を定義してないのに"toString"が存在している
  console.log(obj["toString"]); // "function toString() { [native code] }"
  // Mapのようなからオブジェクト
  const mapLike = Object.create(null);
  // toStringキーは存在しない
  console.log(mapLike["toString"]); // undefined
}
// ES2015以降はMapがある
{
  const map = new Map();
  console.log(map.has("toString")); // false
}
