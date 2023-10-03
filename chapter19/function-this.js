"use strict";
{
  function fn1() {
    return this;
  }
  const fn2 = function () {
    return this;
  };
  // 関数の中の`this`が参照する値は呼び出し方によって決まる
  // `fn1`と`fn2`どちらもただの関数として呼び出している
  // メソッドとして呼び出していないためベースオブジェクトはない
  // ベースオブジェクトがない場合、`this`は`undefined`となる
  console.log(fn1()); // => undefined
  console.log(fn2()); // => undefined
}
{
  // 関数の中に関数を定義して呼び出す場合も同じ
  function outer() {
    console.log(this); // => undefined
    function inner() {
      console.log(this); // => undefined
    }
    // `inner`関数呼び出しのベースオブジェクトはない
    inner();
  }
  // `outer`関数呼び出しのベースオブジェクトはない
  outer();
}

{
  const obj = {
    // 関数式をプロパティの値にしたメソッド
    method1: function () {
      return this;
    },
    // 短縮記法で定義したメソッド
    method2() {
      return this;
    },
  };
  // メソッド呼び出しの場合、それぞれの`this`はベースオブジェクト(`obj`)を参照する
  // メソッド呼び出しの`.`の左にあるオブジェクトがベースオブジェクト
  console.log(obj.method1()); // => obj
  console.log(obj.method2()); // => obj
}
{
  const person = {
    fullName: "Brendan Eich",
    sayName: function () {
      // `person.fullName`と書いているのと同じ
      return this.fullName;
    },
  };
  // `person.fullName`を出力する
  console.log(person.sayName()); // => "Brendan Eich"
}
{
  const obj1 = {
    obj2: {
      obj3: {
        method() {
          return this;
        },
      },
    },
  };
  // `obj1.obj2.obj3.method`メソッドの`this`は`obj3`を参照
  console.log(obj1.obj2.obj3.method() === obj1.obj2.obj3); // => true
}
