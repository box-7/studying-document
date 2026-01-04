# Benchmarks（ベンチマーク）

ベンチマークはあくまで指標の一つに過ぎませんが、私たちにとって非常に重要なものです。

---

## Routers（ルーターの比較）

Honoチームでは、複数の JavaScript ルーターの速度を比較しました。  
たとえば、`find-my-way` は Fastify 内部で使用される非常に高速なルーターとして知られています。

### 比較対象ルーター
- `@medley/router`  
- `find-my-way`  
- `koa-tree-router`  
- `trek-router`  
- `express`（ハンドリングを含む）  
- `koa-router`  

---

### Cloudflare Workers
Cloudflare Workers 向けの他のルーターと比較して、**Hono は最速**です。

### Deno
Deno の他のフレームワークと比べても、**Hono は最速**です。

### Bun
Bun 環境でも、**Hono は最速なフレームワークのひとつ**です。  
以下で詳細をご覧いただけます。
