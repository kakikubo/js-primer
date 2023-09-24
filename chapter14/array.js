// 配列の作成とアクセス
{
  const emptyArray = [];
  const numbers = [1, 2, 3];
  // 2次元配列(配列の配列)
  const matrix = [
    ["a", "b"],
    ["c", "d"],
  ];
  // 配列の要素へのアクセス
  const array = ["one", "two", "three"];
  console.log(array[0]); // "one"
  // 2次元配列へのアクセス
  console.log(matrix[0][0]); // "a"
  // 配列の要素数 -1 が最後の要素のインデックス
  console.log(array[array.length - 1]); // "three"
  console.log(array.length); // 3
  // 存在しない要素にアクセスするとundefined
  console.log(array[100]); // undefined
}
// 以下のようなオブジェクトと同じこと
{
  const obj = {
    0: "one",
    1: "two",
    2: "three",
    length: 3,
  };
  // 配列のようにアクセスできる
  console.log(obj[0]); // "one"
  console.log(obj[100]); // "undefined"
}
// 未定義の箇所が1つ含まれる「疎な配列」(逆は⇔「密な配列」)
// インデックスが1の値を省略しているので、カンマが2つ続いていることに注意
{
  const sparseArray = [1, , 3];
  console.log(sparseArray.length); // 3
  // 1番目の要素は存在しないため　undefined
  console.log(sparseArray[1]); // undefined
}
// オブジェクトが配列かどうかを判定する
{
  const obj = {};
  const array = [];
  console.log(Array.isArray(obj)); // false
  console.log(Array.isArray(array)); // true
  // typeof演算子では判定できない(Arrayもオブジェクトの一種であるため)
  console.log(typeof obj === "object"); // true
}
// TypedArray (ES2015)
{
  // TypedArrayを作成
  const typedArray = new Int8Array(8);
  console.log(Array.isArray(typedArray)); // false
  console.log(typeof typedArray); // "object"
}
