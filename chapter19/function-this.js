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

// thisが問題になる例1
{
  const person = {
    fullName: "Brendan Eich",
    sayName: function () {
      // thisは呼び出し元によって異なる
      return this.fullName;
    },
  };
  // sayNameメソッドはpersonオブジェクトに所属する
  // thisはpersonオブジェクトとなる
  console.log(person.sayName()); // => "Brendan Eich"
  // person.sayNameを変数に代入
  const say = person.sayName;
  // 代入したメソッドを関数として呼ぶ
  // このsay関数はどのオブジェクトにも所属していない
  // thisはundefinedとなるため例外を投げる
  // say(); // => TypeError: Cannot read property 'fullName' of undefined
}
// 対処法 call
{
  function say(message) {
    return `${message} ${this.fullName}!`;
  }
  const person = {
    fullName: "Brendan Eich",
  };
  // thisをpersonにしてsay関数を呼び出す
  console.log(say.call(person, "こんにちは")); // => "こんにちは Brendan Eich!"
  // say関数をそのまま呼び出すとthisはundefinedとなるため例外が発生
  // say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
}
// 対処法 apply
{
  function say(message) {
    return `${message} ${this.fullName}!`;
  }
  const person = {
    fullName: "Brendan Eich",
  };
  // `this`を`person`にしてsay関数を呼び出す
  // callとは異なり引数を配列として渡す
  console.log(say.apply(person, ["こんにちは"])); // => "こんにちは Brendan Eich!"
  // say関数をそのまま呼び出すとthisはundefinedとなるため例外が発生
  // say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined

  // callとapplyの違いは引数が配列であるかどうか
  function add(x, y) {
    return x + y;
  }
  // thisが不要な場合はnullを渡す
  console.log(add.call(null, 1, 2)); // => 3
  console.log(add.apply(null, [1, 2])); // => 3
}
// 対処法 bind
{
  function say(message) {
    return `${message} ${this.fullName}!`;
  }
  const person = {
    fullName: "Brendan Eich",
  };
  // thisをpersonに束縛したsay関数をラップした関数を作る
  const sayPerson = say.bind(person, "こんにちは");
  console.log(sayPerson()); // => "こんにちは Brendan Eich!"
}

// 問題: コールバック関数とthis
{
  const Prefixer = {
    prefix: "pre",
    /**
     * strings 配列の各要素にprefixをつける
     */
    prefixArray(strings) {
      return strings.map(function (str) {
        // コールバック関数におけるthisはundefinedとなる(strict mode)
        // そのためthis.prefixはundefined.prefixとなり例外が発生する
        return this.prefix + "-" + str;
      });
    },
  };
  // prefixArrayメソッドにおけるthisはPrefixer
  // Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined
}
// 対処法1: thisを一次変数へ代入する
{
  const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
      // thisを一時変数に代入する
      const that = this;
      return strings.map(function (str) {
        // 一時変数を通してプロパティを参照する
        return that.prefix + "-" + str;
      });
    },
  };
  // prefixArrayメソッドにおけるthisはPrefixer
  const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
  console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
}
// 対処法2: mapメソッドに使いたいthisを渡す
{
  const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
      // Array#mapメソッドは第二引数にthisとなる値を渡せる
      return strings.map(function (str) {
        // thisが第二引数の値と同じになる
        // つまりprefixArrayメソッドと同じthisになる
        return this.prefix + "-" + str;
      }, this);
    },
  };
  // prefixArrayメソッドにおけるthisはPrefixer
  const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
  console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
}
// 対処法3: Arrow Functionでコールバック関数を扱う
{
  const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
      // Arrow Functionにする
      return strings.map((str) => {
        // Arrow Function自体はthisを持たない
        // thisは外側のprefixArray関数が持つthisを参照する
        // そのためthis.prefixは"pre"となる
        return this.prefix + "-" + str;
      });
    },
  };
  // このとき、prefixArrayのベースオブジェクトはPrefixerとなる
  // つまり、prefixArrayメソッド内のthisはPrefixerを参照する
  const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
  console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
}

{
  // Arrow Functionで定義した関数
  const fn = () => {
    // この関数の外側には関数は存在しない
    // トップレベルのthisと同じ値
    return this;
  };
  console.log(fn() === this); // => true
}
{
  function outer() {
    // Arrow Function で定義した関数を返す
    return () => {
      // この関数の外側にはouter関数が存在する
      // outer関数にthisを書いた場合と同じ
      return this;
    };
  }
  // outer関数の返り値はArrow Functionにて定義された関数
  const innerArrowFunction = outer();
  console.log(innerArrowFunction()); // => undefined
}
{
  // 上記のArrow Functionは以下と同じになる
  function outer() {
    // outer関数直下のthis
    const that = this;
    // Arrow Functionで定義した関数を返す
    return () => {
      // Arrow Function自身はthisを持たない
      // outer関数にthisを書いた場合と同じ
      return that;
    };
  }
  // outer()と呼び出した時のthisはundefined(strict mode)
  const innerArrowFunction = outer();
  console.log(innerArrowFunction()); // => undefined
}
// Arrow Functionはthisをbindできない
{
  const fn = () => {
    return this;
  };
  // Scriptコンテキストの場合、スクリプト直下のArrow Functionのthisは
  // グローバルオブジェクト
  console.log(fn()); // グローバルオブジェクト
  // callでthisを{}にしようとしてもthisは変わらない
  console.log(fn.call({}));

  const obj = {
    method() {
      const arrowFunction = () => {
        return this;
      };
      return arrowFunction();
    },
  };
  // 通常のthisはobj.methodのthisと同じ
  console.log(obj.method()); // => obj
  // obj.methodのthisを変更すれば、Arrow Functionのthisも変更される
  console.log(obj.method.call("THAT")); // => "THAT"
}
