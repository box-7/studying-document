
# CloudFormation テンプレートのセクション構成 要約

- **Resources（必須）**: 作成するAWSリソースを定義する中核セクション
- **Parameters（任意）**: スタック作成時に値を受け取り、テンプレートの再利用性を高める
- **Outputs（任意）**: スタック作成後にリソースIDやURLなどの情報を出力
- **Mappings（任意）**: 条件ごとに値を切り替えるためのルックアップテーブル
- **Metadata（任意）**: テンプレートの補足情報やドキュメント用途
- **Rules（任意）**: パラメータ値の検証ルールを定義
- **Conditions（任意）**: 条件に応じてリソース作成や設定を制御
- **Transform（任意）**: マクロやSAMなどの拡張構文を適用
- **Format version/Description（任意）**: フォーマットバージョンや説明文

→ Resources以外はすべて任意。テンプレートの柔軟性や再利用性、可読性を高めるために活用する。

---

# 🧩 CloudFormation テンプレートのセクション構成

すべての **CloudFormation テンプレート** は、1つ以上のセクションで構成されており、それぞれが特定の目的を持っています。

---

## 🔹 Resources セクション

`Resources` セクションは **すべての CloudFormation テンプレートで必須** であり、テンプレートの中核を成します。  
このセクションでは、スタック内で作成する **AWS リソース** とその **プロパティ** を指定します。  
たとえば、Amazon EC2 インスタンスや Amazon S3 バケットなどです。  

各リソースは次のように定義されます：

- 一意の **論理ID（Logical ID）**
- リソースの **タイプ**
- 特定の **設定内容**

---

## 🔹 Parameters セクション（任意）

`Parameters` セクションはオプションですが、テンプレートを **柔軟に再利用** する上で非常に重要です。  
このセクションを使うと、スタックの **作成時や更新時に実行時引数を受け取る** ことができます。  

これらのパラメータは、`Resources` や `Outputs` セクション内で参照でき、  
テンプレートを直接編集せずに **設定を変更できる** ようになります。

たとえば、環境ごとに異なる以下のような設定に利用できます：
- EC2 インスタンスタイプ
- 環境設定（dev / staging / prod）

---

## 🔹 Outputs セクション（任意）

`Outputs` セクションもオプションですが、スタックの作成後に  
**便利な情報を返す** ために使用されます。  

ここで定義された値は、スタックのプロパティを確認したときに返される出力情報となります。  
出力値としては、たとえば次のようなものがあります：
- リソースの識別子（ID）
- URL（例：作成された Web サーバーの URL）

これにより、作成されたリソースの情報を **他のスタックやオペレーション** に活用できます。

---

## 🔹 Mappings セクション（任意）

`Mappings` セクションは **ルックアップテーブル（対応表）** のように機能し、  
条件に応じて値を管理するのに使われます。  

このセクションで定義したキーと値のペアは、`Fn::FindInMap` 組み込み関数を使用して  
`Resources` や `Outputs` セクションから参照できます。

主な用途：
- AWS リージョンや環境（dev / prod）によって設定値を切り替える  
などの条件分岐に便利です。

---

## 🔹 Metadata セクション（任意）

`Metadata` セクションは、テンプレートに関する **追加情報** を含めるために使用します。  
この情報は AWS によって直接処理されないこともありますが、  
テンプレートを理解しやすくするためのドキュメント的な役割を持ちます。

---

## 🔹 Rules セクション（任意）

`Rules` セクションは、**スタック作成や更新時のパラメータ検証** に使用します。  
1つまたは複数のパラメータが、特定の条件を満たすようにチェックできます。  
これにより、誤った設定でスタックが作成されるのを防ぐことができます。

---

## 🔹 Conditions セクション（任意）

`Conditions` セクションは、テンプレートの柔軟性を高めるために使用されます。  
特定の条件（例：環境が `prod` のときだけリソースを作成する）に基づいて  
リソースの作成やプロパティ設定を制御できます。

---

## 🔹 Transform セクション（任意）

`Transform` セクションは、テンプレートの処理中に **マクロを適用** するために使用します。  

特に **サーバーレスアプリケーション（AWS Lambda アプリ）** の場合、  
どのバージョンの **AWS Serverless Application Model（AWS SAM）** を使用するかを指定します。  

`Transform` を指定することで、AWS SAM の構文を使ってリソースを宣言できます。  
モデルは、どのような構文が使えるか、どのように処理されるかを定義しています。

また、`AWS::Include` トランスフォームを使うことで、  
メインテンプレートとは別に保存されたテンプレートスニペットを **インクルード（再利用）** できます。

---

## 🧭 その他のセクション

| セクション名 | 説明 |
|---------------|------|
| **Format version** | テンプレートフォーマットのバージョン指定（例：`2010-09-09`） |
| **Description** | テンプレートの説明文（任意） |

---

## 📚 関連トピック

- [Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)  
- [Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)  
- [Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)  
- [Mappings](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)  
- [Metadata](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)  
- [Rules](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/rules-section-structure.html)  
- [Conditions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html)  
- [Transform](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)  
- [Format version](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-section-structure.html)  
- [Description](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/description-section-structure.html)


