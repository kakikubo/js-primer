// ./my-module.jsのすべての名前つきエクスポートを再エクスポートする
export * from "./my-module.js";
// ./my-module.jsの名前つきエクスポートを選んで再エクスポートする
export { foo, bar } from "./my-module.js";
// console.log(foo); // => "foo"
// console.log(bar); // => bar()の関数オブジェクト
// ./my-module.jsの名前つきエクスポートにエイリアスをつけて再エクスポートする
export { foo as myModuleFoo, bar as myModuleBar } from "./my-module.js";
// console.log(myModuleFoo); // => "foo"
// console.log(myModuleBar); // => bar()の関数オブジェクト
// ./my-module.jsのデフォルトエクスポートをデフォルトエクスポートとして再エクスポートする
export { default } from "./my-module.js";
// ./my-module.jsの名前つきエクスポートをデフォルトエクスポートとして再エクスポートする
// export { foo as default } from "./my-module.js";
