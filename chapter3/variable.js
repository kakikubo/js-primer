/******************* 
const ES2015から追加された。再代入不可な変数を宣言する。
*******************/
const bookTitle = "JavaScript Primer",
  bookCategory = "プログラミング";

// bookTitle = "はじめてのJavaScript"; // 再代入はエラー
// const bookTitle = "はじめてのJavaScript"; // 再定義もエラー

/*********** 
let ES2015から追加された。再代入可能な変数を宣言する。
*************/
let lbookTitle = "JavaScript Primer",
  lbookCategory = "プログラミング";

lbookTitle = "はじめてのJavaScript"; // OK

let lbook; // 変数の宣言 (undefined)
// let lbook; // エラー (変数の再宣言)

/*
var ES2015より前からある。再代入可能な変数を宣言する。
再定義可能なので、バグの温床fなりやすい。
*/
var vbookTitle;
vbookTitle = "JavaScript Primer";
vbookTitle = "JavaScript Practice";

var vbookTitle = "JavaScript Primer"; // エラーにならない

/****
 * 変数名のルール
 ****/
var $; // OK $がｄ利用ｄ
var _title; // OK: _が利用できる
var jquery; // OK: 小文字のアルファベットが利用できる
var TITLE; // OK: 大文字のアルファベットが利用できる
var es2015; // OK: 数字は先頭以外なら利用できる
var 日本語の変数名; // OK: 一部の漢字や日本語も利用できる(非推奨)
// var 1st; // NG: 数字からはじまっている
// var 123; // NG: 数字のみで構成されている
// var var; // NG: 予約語
// var if; // NG: 予約語

/**
 * constは必ずしも定数ではない。あくまで再代入不可な変数。
 */
const TEN_NUMBER = 10; // 実質的に定数
const obj = { key: "value" };
obj.key = "value2"; // OK: 再代入可能 (なので定数とは言えない)
