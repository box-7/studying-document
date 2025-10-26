# AWS CloudFormation とは

AWS CloudFormation は、AWS リソースのモデル化およびセットアップに役立つサービスです。リソース管理に割く時間を減らし、AWS で実行するアプリケーションにさらに注力できます。

CloudFormation では、使用するすべての AWS リソース（Amazon EC2 インスタンスや Amazon RDS DB インスタンスなど）を記述する **テンプレート** を作成します。CloudFormation がリソースのプロビジョニングや設定を自動で行うため、個別にリソースを作成したり依存関係を考慮したりする必要はありません。

---

## インフラストラクチャ管理を簡略化

バックエンドデータベースを含むスケーラブルなウェブアプリケーションで、Auto Scaling グループ、Elastic Load Balancing ロードバランサー、Amazon RDS データベースインスタンスを使用する場合、個別にリソースを作成し、それぞれを連携させる設定を行う必要があります。これは、アプリケーションを運用する前から複雑で時間のかかる作業です。

CloudFormation テンプレートを作成または既存のテンプレートを変更すると、テンプレートに記述されたリソースとプロパティに基づき、CloudFormation が Auto Scaling グループ、ロードバランサー、データベースをプロビジョニングします。スタックが正常に作成されると、リソースの利用を開始できます。スタックの削除も簡単で、関連するすべてのリソースを一括で削除できます。これにより、リソースのコレクションを単一のユニットとして管理可能です。

**自分メモ**
「プロビジョニング（provisioning）」  
IT やクラウドの文脈では システムやリソースを利用可能な状態に準備すること

---

## インフラストラクチャをすばやく複製

アプリケーションの可用性を高めるため、複数リージョンに複製して、1 つのリージョンが利用できなくなった場合でも他のリージョンで利用できるようにできます。しかし、この場合はリソースも複製する必要があります。

CloudFormation テンプレートを再利用することで、一貫性のある繰り返し可能な方法でリソースを作成できます。一度テンプレートにリソースを記述すれば、複数リージョンで同じリソースを何度でもプロビジョニング可能です。

---

## インフラストラクチャの制御や変更の追跡

基盤となるリソースを段階的にアップグレードする場合があります。例えば、Auto Scaling グループの起動設定をより効率的なインスタンスタイプに変更して最大インスタンス数を減らす場合などです。問題が発生した場合、インフラを元の設定にロールバックする必要があります。

CloudFormation を使うと、テンプレートによりプロビジョニングされるリソースとその設定が正確に記述されます。テンプレートはテキストファイルなので、バージョン管理システムを使用して変更履歴を追跡できます。変更内容、変更者、変更日時を把握でき、必要に応じて以前のテンプレートを使ってインフラを元に戻すことも可能です。

---

## CloudFormation の使用開始

CloudFormation は以下から利用可能です：

- CloudFormation コンソール  
- API  
- AWS CLI  
- AWS SDK  
- その他いくつかの統合ツール  

### 参考リンク

- CloudFormation の仕組み: 「[CloudFormation の仕組み](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)」  
- 最初のスタック作成: 「[最初のスタックの作成](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html)」  
- 製品詳細と FAQ: 「[AWS CloudFormation 製品ページ](https://aws.amazon.com/cloudformation/)」  
- 料金情報: 「[AWS CloudFormation の料金](https://aws.amazon.com/cloudformation/pricing/)」
