# oracle-fe

*[oracle-fe](https://gitlab.com/ARGI-BERRI/oracle-fe)* は *[oracle-api](https://gitlab.com/ARGI-BERRI/oracle-api)* のフロントエンド実装です。*oracle-fe* は *oracle-api* の機能と認証機能、そしていくつかの追加設定とその管理機能を見やすいインタフェースの上に実現します。

## 機能

- *oracle-api* の全機能（所与条件に基づく御神託の受信機能）
- 御神託の引き直し機能
- 御神託のクリップボードへのコピー機能
- 変な御神託の受信管理、クリップボードのコピー設定の管理
- 設定の保存機能（GitHub 認証を通した場合のみ）

## ライセンス

AGPLv3

## 開発について

### 開発サーバの起動

```bash
$ pnpm install 
# -> 依存関係が解決されます
$ pnpm dev     
# -> 開発サーバが起動します
```

追加の設定をしていない場合は、`http://localhost:3000` からアプリケーションを閲覧できます。

### アプリケーションの配置

*oracle-fe* は Vercel への配置のみをサポートしています。Vercel Serverless Function と互換するならば他の CI/CD 基盤でも運用できますが、安定した動作は保証できません。

Vercel に限らず何らかの基盤に配置する際は、続く節の「環境変数」を基盤の設定で導入してください。環境変数の設定がない場合、アプリケーションのビルドは失敗します。

### 環境変数

```ini
# アプリケーション全体のベースドメイン。
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# oracle-api のエンドポイント。
ORACLE_URL=https://example.com

# 認証基盤（next-auth）の OAuth 認証に使用する GitHub クライアント ID とシークレット。
GITHUB_ID=...
GITHUB_SECRET=...

# 認証基盤（next-auth）で使用するベースドメイン。NEXT_PUBLIC_BASE_URL と通常同一。
NEXTAUTH_URL=http://localhost:3000

# openssl rand -base64 32 などで出力される秘密鍵。
NEXTAUTH_SECRET=...

# 利用者毎の設定を保存する PostgresSQL サーバのエンドポイント。
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
