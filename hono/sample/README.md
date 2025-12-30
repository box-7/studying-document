# Hono RPC サンプル構成

## ディレクトリ内容

- server.tsx: POST /api/users のバリデーション付きサンプル API（JSX/HTML 返却）
- server.ts: GET /api/users/:id のバリデーション付きサンプル API
- client.mts: 型安全な API クライアント呼び出し例（ESM 形式）
- client.tsx: React 風 UI で API 呼び出し例

## 動かし方（例）

1. 必要なパッケージをインストール

```
npm install hono @hono/zod-validator zod

npm install hono@latest
```

2. サーバーを起動
   ~~ npx hono run server.tsx ~~

```
npx tsx server.tsx
```

3. クライアントコードは Node.js で実行、またはブラウザで動作確認

```
npx tsx client.mts
```

> JSX や ESM 対応のため、Node.js v18+推奨。必要に応じて tsconfig.json や vite 等の設定を追加してください。
