# Vite の設定（Configuring Vite）

Vite をコマンドラインから実行すると、プロジェクトルート内にある `vite.config.js` を自動的に解決しようとします。他の JS や TS 拡張子もサポートされています。

最も基本的な設定ファイルは、以下のように書きます。
```
export default {
  // config options
}
```

注意: Vite は、プロジェクトがネイティブ Node ESM を使っていなくても（package.json に `"type": "module"` がなくても）、ES モジュール構文を設定ファイルで使用できます。この場合、設定ファイルは読み込む前に自動的にプリプロセスされます。

設定ファイルを明示的に指定する場合は、以下のようにコマンドを実行します。
```
vite --config my-config.js
```
---

## 設定の読み込み

デフォルトでは Vite は esbuild を使って設定ファイルを一時的にバンドルして読み込みます。モノレポで TypeScript ファイルをインポートする場合、この方法で問題が起こることがあります。その場合は、`--configLoader runner` を指定すると、モジュールランナーを使用して一時的ファイルを作らずにその場で変換して読み込めます。ただし、モジュールランナーは設定ファイル内の CJS をサポートしていませんが、外部 CJS パッケージは通常通り動作します。


TypeScript をサポートする環境（例: `node --experimental-strip-types`）や、単純な JavaScript の場合は、`--configLoader native` を使って環境のネイティブランタイムで設定ファイルを読み込むこともできます。この場合、設定ファイルからインポートされたモジュールの更新は検知されず、Vite サーバーは自動再起動しません。

---

## 設定ファイルのインテリセンス（Config Intellisense）

Vite は TypeScript 型定義を持っているため、IDE のインテリセンスで補完が可能です。例えば、以下 のように書きます。

```
/** @type {import('vite').UserConfig} */
export default {
  // ...
}
```

または、以下と書くと、JSDoc 注釈なしでも補完が効きます。
```
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

TypeScript の設定ファイルもサポートされており、`vite.config.ts` で `defineConfig` や `satisfies` を使って型チェックできます。
```
import type { UserConfig } from 'vite'

export default {
  // ...
} satisfies UserConfig
```

---

## 条件付き設定（Conditional Config）

設定が `serve` や `build` のコマンド、モード、SSR ビルドかどうか、プレビューかどうかによって変わる場合、関数をエクスポートできます。例えば、以下のように書きます。
```

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      // build specific config
    }
  }
})
```


- `command` は開発中は `'serve'`、本番ビルド時は `'build'`
- `isSsrBuild` と `isPreview` はオプションで、サポートされないツールでは `undefined` になる場合があるため、`true` / `false` と明示的に比較することが推奨されます。

---

## 非同期設定（Async Config）

設定で非同期関数を呼ぶ場合は、以下のように async 関数をエクスポートできます。
```
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite config
  }
})
```

---

## 設定内で環境変数を使う

設定ファイル実行時に利用可能な環境変数は、現在の `process.env` に存在するものだけです。Vite は `.env*` ファイルの読み込みを設定解決後まで遅延させます。  
つまり、`.env`, `.env.local`, `.env.[mode]`, `.env.[mode].local` の変数は設定ファイル実行中に自動的に `process.env` に注入されません。アプリコードには後で `import.meta.env` 経由で利用できます。

もし設定自体に `.env*` の値を反映させたい場合は、以下のように書きます。
```
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      // Provide an explicit app-level constant derived from an env var.
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Example: use an env var to set the dev server port conditionally.
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  }
})
```

---

## VS Code で設定ファイルのデバッグ

デフォルトの `--configLoader bundle` では、Vite が生成した一時設定ファイルを `node_modules/.vite-temp` に書き込むため、ブレークポイントを設定するとファイルが見つからないエラーになります。

これを回避するには、以下を追加します。

```
{
  "debug.javascript.terminalOptions": {
    "resolveSourceMapLocations": [
      "${workspaceFolder}/**",
      "!**/node_modules/**",
      "**/node_modules/.vite-temp/**"
    ]
  }
}
```




