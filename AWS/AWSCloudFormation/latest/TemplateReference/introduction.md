
# AWS CloudFormation テンプレートリファレンス

これは新しい AWS CloudFormation テンプレートリファレンスガイドです。ブックマークやリンクを更新してください。CloudFormation の開始方法については、『[AWS CloudFormation ユーザーガイド](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)』を参照してください。

AWS CloudFormation テンプレートリファレンスガイドは、ユーザーガイドの補完資料であり、テンプレート作成時に使用できるさまざまなコンポーネントの詳細情報を提供します。

---

## リファレンスの概要

AWS CloudFormation テンプレートリファレンスガイドには、以下のトピックのリファレンス情報が含まれています。

### リソースタイプとプロパティ
CloudFormation を使用して作成および管理できる AWS リソースのさまざまなタイプ。  
各リソースタイプには、リソースの設定をカスタマイズするために指定できる独自のプロパティセットがあります。  
詳細は「[AWS リソースおよびプロパティタイプのリファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)」を参照。

### リソース属性
リソースの動作や他のリソースとのやり取りを決定する特別な設定。  
例：`UpdatePolicy` 属性で、リソース更新時の挙動を指定可能。  
詳細は「[リソース属性リファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html)」を参照。

### 組み込み関数
文字列結合や他のリソース参照など、特定のタスクを実行するための組み込み関数。  
詳細は「[組み込み関数リファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)」を参照。

### トランスフォーム
テンプレート内で特定のタスクや操作を簡単に実行できる CloudFormation マクロ。  
詳細は「[変換のリファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)」を参照。

### ヘルパースクリプト
スタックの一部として作成する EC2 インスタンスでソフトウェアをインストールしたりサービスを開始したりするための Python ヘルパースクリプト。  
詳細は「[CloudFormation ヘルパースクリプトリファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-helper-scripts-reference.html)」を参照。

### リソース仕様とスキーマ
各リソースタイプの詳細な仕様とスキーマを含むファイル。  
詳細は「[Resource spec およびスキーマリファレンス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html)」を参照。

---

## CloudFormation 初めての使用

CloudFormation テンプレートを初めて使用する場合は、まず『[AWS CloudFormation ユーザーガイド](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-templates.html)』の「CloudFormation テンプレートの使用」セクションを確認することを推奨します。

初めて使用する場合は、「[CloudFormation の使用開始](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/gettingstarted.html)」を参照してください。  
このガイドでは、サンプルテンプレートを使用して最初のスタックを作成する方法が説明されています。
