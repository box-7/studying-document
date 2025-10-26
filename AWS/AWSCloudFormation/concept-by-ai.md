# ☁️ AWS CloudFormationとは

AWS CloudFormation（クラウドフォーメーション）は、**AWSのインフラ構成をコードとして管理するサービス（IaC：Infrastructure as Code）**です。

---

## 🌩️ CloudFormationの概要

CloudFormationを使うと、サーバーやデータベース、ネットワーク設定などの **AWSリソースを自動的に作成・管理** できます。  
設定は **YAML** または **JSON** 形式の「テンプレート」で記述します。

---

## 🧱 仕組み

1. **テンプレート（Template）を書く**  
   例：EC2インスタンス、S3バケット、VPC、IAMロールなどを定義。

2. **スタック（Stack）を作成**  
   テンプレートをAWSにアップロードすると、「スタック」という単位でリソースがまとめてデプロイされる。

3. **AWSが自動的に作成・削除**  
   CloudFormationが依存関係を理解して、正しい順序でリソースを構築・削除。

---

## 🧩 メリット

- **再現性**：同じテンプレートで同じ環境を何度でも構築できる  
- **自動化**：手作業の設定ミスを防止  
- **変更追跡**：テンプレートの変更履歴をGitで管理可能  
- **統合**：CodePipelineなどのAWS CI/CDと組み合わせ可能  

---

## 🧾 例（YAML）

テンプレートを使って、S3バケットを自動作成する例です。

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-sample-bucket-2025
```

このテンプレートを使うと、`my-sample-bucket-2025` という S3 バケットを自動で作成します。

---

## ⚙️ よくある用途

- 開発／本番環境を同一構成で構築  
- CI/CD パイプラインの構築  
- サーバーレスアプリ（Lambda、API Gatewayなど）の展開  
- ネットワーク（VPC、サブネット、セキュリティグループ）の自動設定  

---

## 🆚 似たサービスとの違い

| サービス | 主な用途 | 備考 |
|-----------|-----------|------|
| **CloudFormation** | AWSリソース構築（AWS公式） | AWSに最適化 |
| **Terraform** | マルチクラウド対応のIaCツール | AWS以外（GCP, Azure等）も扱える |
| **CDK (Cloud Development Kit)** | TypeScript/PythonなどのコードでCloudFormationテンプレートを生成 | 開発者向け |

---

## 💡 まとめ

> **CloudFormation = AWSインフラを“設計図（YAML/JSON）”で自動構築できるツール**











