
# 要約
AWS CloudFormationは、AWSインフラをテンプレートで宣言し、予測可能かつ繰り返し可能に構築・管理できるサービスです。
スタック単位でリソースをまとめて作成・更新・削除でき、依存関係も自動管理されます。

主な操作は以下の通りです。

スタック操作: スタックの作成・更新・削除やリソース管理
変更セット: 変更内容を事前に確認し、安全にスタックを更新
StackSets: 複数アカウント・リージョンへの一括展開
拡張機能管理: 独自リソースタイプの登録・管理
拡張機能公開: サードパーティ拡張機能の開発・公開


---
# ようこそ

AWS CloudFormation を使用すると、AWS インフラストラクチャの展開を**予測可能かつ繰り返し可能**に作成・管理できます。  
CloudFormation を活用することで、Amazon Elastic Compute Cloud（EC2）、Amazon Elastic Block Store（EBS）、Amazon Simple Notification Service（SNS）、Elastic Load Balancing（ELB）、Amazon EC2 Auto Scaling などの AWS サービスを利用し、基盤となる AWS インフラを個別に作成・設定することなく、**高信頼性・高スケーラビリティ・コスト効率の高いアプリケーション**を構築できます。

CloudFormation では、すべてのリソースと依存関係を **テンプレートファイル** に宣言します。  
テンプレートはリソースの集合を **スタック（stack）** という単位として定義します。  
CloudFormation はスタック内のすべてのリソースをまとめて作成・削除し、リソース間の依存関係も自動で管理します。

CloudFormation の詳細は [AWS CloudFormation 製品ページ](https://aws.amazon.com/cloudformation/) を参照してください。  
特定の AWS サービスに関する技術情報は [AWS ドキュメント](https://docs.aws.amazon.com/) で確認できます。

---

## スタック操作

CloudFormation では、関連するリソースを **スタック** として単位管理します。  
スタックを作成、更新、削除することで、関連リソースの操作をまとめて実行できます。  
スタック内のリソースは、スタックのテンプレートで定義されています。

- スタック管理: `CancelUpdateStack` | `ContinueUpdateRollback` | `CreateStack` | `DeleteStack` | `DescribeStacks` | `ListStacks` | `UpdateStack`
- スタックイベント: `DescribeStackEvents`
- スタックリソース: `DescribeStackResource` | `DescribeStackResources` | `ListStackResources`
- スタックドリフト: `DescribeStackDriftDetectionStatus` | `DescribeStackResourceDrifts` | `DetectStackDrift` | `DetectStackResourceDrift`
- スタック操作: `ListExports` | `ListImports` | `UpdateTerminationProtection`
- スタックポリシー: `GetStackPolicy` | `SetStackPolicy`
- テンプレート: `EstimateTemplateCost` | `GetTemplate` | `GetTemplateSummary` | `ValidateTemplate`

---

## 変更セット操作

スタックの稼働中リソースを変更する場合、スタックを更新します。  
変更前に **変更セット（Change Set）** を作成すると、提案された変更の概要を確認できます。  
変更セットを使うことで、特に重要なリソースへの影響を事前に確認可能です。

- `CreateChangeSet` | `DeleteChangeSet` | `DescribeChangeSet` | `ExecuteChangeSet` | `ListChangeSets`

---

## StackSets 操作

CloudFormation StackSets を使うと、単一テンプレートから複数の AWS アカウントやリージョンに共通リソースを安全に展開できます。  
StackSet 作成時、指定したアカウントとリージョンにスタックがプロビジョニングされます。  
StackSets により、複数のアカウントやリージョンで共通リソースを単一操作で管理できます。

- StackSets: `CreateStackSet` | `DeleteStackSet` | `DescribeStackSet` | `ListStackSets` | `UpdateStackSet`
- スタックインスタンス: `CreateStackInstances` | `DeleteStackInstances` | `DescribeStackInstance` | `ListStackInstances`
- StackSet 操作: `DescribeStackSetOperation` | `ListStackSetOperations` | `ListStackSetOperationResults` | `StopStackSetOperation`

---

## 拡張機能管理操作

AWS CloudFormation レジストリを使用すると、アカウントで利用可能なプライベートおよびパブリックの拡張機能を管理できます。

- タイプ管理: `ActivateType` | `DeactivateType` | `DescribeType` | `ListTypes`
- 登録: `DescribeTypeRegistration` | `DeregisterType` | `ListTypeRegistrations` | `RegisterType`
- 設定: `BatchDescribeTypeConfigurations` | `SetTypeConfiguration`
- バージョン管理: `ListTypeVersions` | `SetTypeDefaultVersion`

---

## 拡張機能公開操作

CloudFormation を利用して、自身のパブリックなサードパーティ拡張機能を開発・公開できます。  
詳細は [AWS CloudFormation CLI ユーザーガイド「Publishing extensions」](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/) を参照してください。

- 公開操作: `PublishType` | `TestType`
- パブリッシャー管理: `DescribePublisher` | `RegisterPublisher`

---

*最終更新日: 2025年10月24日*
