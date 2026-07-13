# Digital Diary — Supabase local setup

このリポジトリにはシンプルなフロントエンド（index.html）があり、Supabaseのテーブル `diary_entries` と同期できます。

クイックセットアップ（Supabase CLIがインストール済みである前提）:

1. ログイン

```bash
supabase login
```

2. プロジェクトをリンク（プロジェクトRefが分かっている場合）

```bash
supabase link --project-ref your-project-ref
```

3. ローカルでSupabaseを起動

```bash
supabase start
```

4. マイグレーション（ローカルDBにテーブルを作成）

```bash
# このリポジトリの supabase/migrations/001_init.sql を参照
supabase db reset --skip-prompt
```

5. ブラウザで `index.html` を開き、右上の `SUPABASE_URL` と `SUPABASE_ANON_KEY` を入力して `Connect` を押します。
   - または環境変数に設定済みならページは自動的に supabase を利用します（index.html 内の `SUPABASE_URL` と `SUPABASE_ANON_KEY` を置換してください）。

6. 接続後、`Sync DB` を押すとデータベースから最新のエントリを取得します。日記を保存するとDBへ挿入されます。

セキュリティ:
- 本番用の `service_role` キーは絶対にクライアントに露出しないでください。フロントエンドでは `anon` キーを使用します。
