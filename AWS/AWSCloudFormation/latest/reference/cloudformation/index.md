
# CloudFormation 要約

## 説明

AWS CloudFormationは、AWSインフラをテンプレートで宣言し、**予測可能かつ繰り返し可能**に構築・管理できるサービスです。  
スタック単位でリソースをまとめて作成・削除し、依存関係も自動管理されます。

「予測可能かつ繰り返し可能」とは、
同じテンプレートや手順を使えば、毎回同じAWSインフラ環境を自動で正確に再現できるという意味です。

予測可能: どんな構成になるか事前に分かる（意図しない違いが出ない）
繰り返し可能: 何度実行しても同じ結果になる（手作業によるミスやばらつきがない）
これにより、開発・テスト・本番など複数環境で同じ構成を安全に作成・管理できます。

```
CloudFormation全体の概要やコマンド一覧（index.md）
用途:
CloudFormationの仕組みや特徴、どんなコマンドがあるかを知りたいときに使います。

できること:
コマンド（例: create-stack など）を使って、テンプレート（YAML/JSONファイル）を指定し、AWSリソースを作成・管理できます。

リソース作成方法:
YAML/JSONテンプレートを用意し、コマンドで一括作成します。
```

# CloudFormation

## 説明

CloudFormation を使用すると、Amazon Web Services（AWS）のインフラストラクチャ展開を**予測可能かつ繰り返し可能**に作成・管理できます。  
CloudFormation を利用することで、Amazon Elastic Compute Cloud（EC2）、Amazon Elastic Block Store（EBS）、Amazon Simple Notification Service（SNS）、Elastic Load Balancing（ELB）、Amazon EC2 Auto Scaling などの AWS サービスを活用し、**高信頼性・高スケーラビリティ・コスト効率の高いアプリケーション**を、基盤となる AWS インフラを個別に作成・設定することなく構築できます。

CloudFormation では、すべてのリソースと依存関係を **テンプレートファイル** に宣言します。  
テンプレートはリソースの集合を **スタック（stack）** という単位として定義します。  
CloudFormation はスタック内のすべてのリソースをまとめて作成・削除し、リソース間の依存関係も自動で管理します。

CloudFormation の詳細については、[CloudFormation 製品ページ](https://aws.amazon.com/cloudformation/) を参照してください。

CloudFormation は他の AWS サービスも利用します。特定の AWS サービスに関する詳細な技術情報が必要な場合は、[AWS ドキュメント](https://docs.aws.amazon.com/) で確認できます。

---

## 利用可能なコマンド

- `activate-organizations-access`
- `activate-type`
- `batch-describe-type-configurations`
- `cancel-update-stack`
- `continue-update-rollback`
- `create-change-set`
- `create-generated-template`
- `create-stack`
- `create-stack-instances`
- `create-stack-refactor`
- `create-stack-set`
- `deactivate-organizations-access`
- `deactivate-type`
- `delete-change-set`
- `delete-generated-template`
- `delete-stack`
- `delete-stack-instances`
- `delete-stack-set`
- `deploy`
- `deregister-type`
- `describe-account-limits`
- `describe-change-set`
- `describe-change-set-hooks`
- `describe-generated-template`
- `describe-organizations-access`
- `describe-publisher`
- `describe-resource-scan`
- `describe-stack-drift-detection-status`
- `describe-stack-events`
- `describe-stack-instance`
- `describe-stack-refactor`
- `describe-stack-resource`
- `describe-stack-resource-drifts`
- `describe-stack-resources`
- `describe-stack-set`
- `describe-stack-set-operation`
- `describe-stacks`
- `describe-type`
- `describe-type-registration`
- `detect-stack-drift`
- `detect-stack-resource-drift`
- `detect-stack-set-drift`
- `estimate-template-cost`
- `execute-change-set`
- `execute-stack-refactor`
- `get-generated-template`
- `get-stack-policy`
- `get-template`
- `get-template-summary`
- `import-stacks-to-stack-set`
- `list-change-sets`
- `list-exports`
- `list-generated-templates`
- `list-hook-results`
- `list-imports`
- `list-resource-scan-related-resources`
- `list-resource-scan-resources`
- `list-resource-scans`
- `list-stack-instance-resource-drifts`
- `list-stack-instances`
- `list-stack-refactor-actions`
- `list-stack-refactors`
- `list-stack-resources`
- `list-stack-set-auto-deployment-targets`
- `list-stack-set-operation-results`
- `list-stack-set-operations`
- `list-stack-sets`
- `list-stacks`
- `list-type-registrations`
- `list-type-versions`
- `list-types`
- `package`
- `publish-type`
- `record-handler-progress`
- `register-publisher`
- `register-type`
- `rollback-stack`
- `set-stack-policy`
- `set-type-configuration`
- `set-type-default-version`
- `signal-resource`
- `start-resource-scan`
- `stop-stack-set-operation`
- `test-type`
- `update-generated-template`
- `update-stack`
- `update-stack-instances`
- `update-stack-set`
- `update-termination-protection`
- `validate-template`
- `wait`
