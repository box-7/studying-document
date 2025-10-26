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
