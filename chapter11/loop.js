// while
let x = 0;
console.log(`ループ開始前のxの値: ${x}`);
while (x < 10) {
  console.log(x);
  x += 1;
}
console.log(`ループ終了後のxの値: ${x}`);

// do...while
{
  const x = 1000;
  do {
    console.log(x);
  } while (x < 10);
}

// for
function sum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}
console.log(sum([1, 2, 3, 4, 5])); // 15

// forEach
const array = [1, 2, 3, 4, 5];
array.forEach((value, index, array) => {
  console.log(value, index, array);
});
// 引数として渡される関数のことをコールバック関数と呼ぶ
// コールバック関数を引数として受け取るforEach関数のことを高階関数と呼ぶ
// array.forEach(コールバック関数)
array.forEach((currentValue) => {
  console.log(currentValue);
});
// sum関数をforEachで書き換える
function forEachSum(numbers) {
  let total = 0;
  numbers.forEach((number) => {
    total += number;
  });
  return total;
}
console.log(forEachSum([1, 2, 3, 4, 5])); // 15

// break文
const numbers = [1, 5, 10, 15, 20];
// 偶数があるかどうか
{
  let isEvenIncluded = false;
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (num % 2 === 0) {
      isEvenIncluded = true;
      break;
    }
  }
  console.log(isEvenIncluded); // true
}
// 上記をリファクタしてみる
// 引数のnumが偶数ならtrueを返す
function isEven(num) {
  return num % 2 === 0;
}
// 引数のnumbersに偶数が含まれているならtrueを返す
function isEvenIncluded(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (isEven(num)) {
      return true;
    }
  }
  return false;
}
console.log(isEvenIncluded([1, 5, 10, 15, 20])); // true
console.log(isEvenIncluded([1, 3, 5])); // false

// 配列のsomeメソッド
console.log(numbers.some(isEven)); // true
console.log([1, 3, 5].some(isEven)); // false

// continue文
{
  function filterEven(numbers) {
    const results = [];
    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      if (!isEven(num)) {
        continue;
      }
      results.push(num);
    }
    return results;
  }
  const array = [1, 5, 10, 15, 20];
  console.log(`array(even) is ${filterEven(array)}`); // [10, 20]
}

// 配列のfilterメソッド。上記の処理が簡単にかける
{
  const array = [1, 5, 10, 15, 20];
  console.log(array.filter(isEven)); // [10, 20]
}

// for .. in 文(結論、推奨しない)
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
// 注記: ループのたびに毎回新しいブロックに変数keyが定義されるため、再定義エラーが発生しない
for (const key in obj) {
  const value = obj[key];
  console.log(`key:${key}, value:${value}`);
}
// for..in文は親オブジェクトまでも探索して列挙可能なものがあるかどうかを探索してしまう。
// 以下のようにObject.keysを使うと列挙可能なプロパティのみを取得できる
Object.keys(obj).forEach((key) => {
  const value = obj[key];
  console.log(`key:${key}, value:${value}`);
});
// for..inを配列に対して使うと、インデックスが列挙される(意図しない結果)
{
  const numbers = [5, 10];
  let total = 0;
  for (const num in numbers) {
    // 0 + "0" + "1"という文字列結合がおこなわれる
    total += num;
  }
  console.log(total); // "001"
}

// for..of文 (ES2015)
// Symbol.iteratorを持つオブジェクトはiterable(反復可能)であるという
// iterableなオブジェクトはfor..of文で反復処理が可能
{
  const numbers = [5, 10];
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  console.log(total); // 15

  // Stringもiterable
  const str = "吉野家";
  for (const value of str) {
    console.log(value); // 吉, 野, 家
  }
}

// reduceを使った配列の合計
function sum(numbers) {
  return numbers.reduce((total, num) => {
    console.log(`total:${total}, num:${num}`);
    return total + num;
  }, 0);
}
console.log(sum([1, 2, 3, 4, 5])); // 15
