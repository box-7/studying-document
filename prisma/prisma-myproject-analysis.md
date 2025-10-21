
# 「開発で SQLite」「本番で PostgreSQL」に分ける理由 / React + Prisma を AWS にデプロイしている場合

💡 ざっくり結論
環境	データベース	理由（メリット）  
開発	SQLite	軽量・セットアップ不要・ローカルで高速に動作  
本番	PostgreSQL	並列接続・トランザクション・スケール・安定性  

🧩 詳しく説明  
🧱 開発で SQLite を使う理由  
- サーバ不要  
SQLite はファイル1つ（例：dev.db）だけで動く。  
Docker や RDS の設定が不要で、環境構築が超早い。  
- マイグレーションの試験に最適  
npx prisma migrate dev で簡単にリセットできる。  
スキーマ変更をすぐに試せる。  
- チーム開発が簡単  
SQLite ファイルを .gitignore にすれば、誰でもローカルで同じ schema から再生成できる。  

🏗️ 本番で PostgreSQL を使う理由  
- 同時アクセスに強い  
SQLite は「1人が書き込み中は他の書き込みをブロック」する設計。  
Postgres は同時に数百・数千のクエリを処理可能。  
- スケールしやすい  
AWS RDS や Aurora などでスケールアウト可能。  
バックアップ・リカバリ・監視などの運用ツールが充実。  
- Prisma が本来最適化しているターゲット  
Prisma は RDB（Postgres/MySQL）向けの最適化が中心。  
SQLite は「簡易利用向け（開発専用）」の扱い。  


# qiita記事にまとめた
Prismaを使ってローカル(sqlite)と本番(postgresql)でDBを使い分ける  
https://qiita.com/like-mountain/items/a5eec8358075d88a2e5a
