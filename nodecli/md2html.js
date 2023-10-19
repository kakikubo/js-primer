// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

export function md2html(markdown, cliOptions) {
  return marked(markdown, {
    gfm: cliOptions.gfm,
  });
}
