import * as myModule from "./all-export.js";
console.log(myModule.default.baz); // => "baz"
console.log(myModule.foo); // => "foo"
console.log(myModule.bar); // => bar()の関数オブジェクト
console.log(myModule.myModuleFoo); // => "foo"
console.log(myModule.myModuleBar); // => bar()の関数オブジェクト

// ./side-effect.jsのグローバルコードを実行される
import "./side-effect.js";
