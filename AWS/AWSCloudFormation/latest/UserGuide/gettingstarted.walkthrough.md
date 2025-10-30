
# 最初のスタックの作成 要約

- AWSコンソールでCloudFormationスタックを作成する手順を学ぶチュートリアル
- YAML形式のテンプレート例を使い、EC2インスタンスとセキュリティグループを自動作成
- パラメータでAMI IDやインスタンスタイプ、アクセス元IPを指定可能
- テンプレートをアップロードし、ウィザードに従ってスタックを作成
- 作成状況は「Events」タブで確認、出力タブでWebサーバーのURLを取得
- ブラウザでURLにアクセスし「Hello World!」が表示されれば成功
- トラブル時はVPCやサブネット設定を見直す
- 不要なリソースやS3バケットは削除してコストを防止
- さらなる学習はテンプレート操作やワークショップで実践可能

---

# 最初のスタックの作成

このトピックでは、AWS Management Console を使用して最初の CloudFormation スタックを作成する手順を説明します。このチュートリアルを通じて、基本的な AWS リソースのプロビジョニング、スタックイベントの監視、出力の生成方法を学ぶことができます。

この例では、CloudFormation テンプレートは YAML 形式で書かれています。YAML は人間に読みやすく、インフラをコードとして定義する際に広く使用されているフォーマットです。CloudFormation を学ぶ過程で JSON 形式のテンプレートに出会うこともありますが、このチュートリアルでは可読性の高い YAML を使用しています。

> **注意**  
> CloudFormation 自体は無料ですが、作成する Amazon EC2 や Amazon S3 のリソースには課金されます。AWS を初めて利用する場合は、Free Tier を活用することで、学習中のコストを最小化またはゼロにすることが可能です。

---

## トピック

- 前提条件
- コンソールで CloudFormation スタックを作成
- スタック作成の監視
- Web サーバーのテスト
- トラブルシューティング
- クリーンアップ
- 次のステップ

---

## 前提条件

- Amazon EC2、Amazon S3、CloudFormation を使用できる IAM ユーザーまたはロール、または管理者権限を持つユーザーであること。  
- インターネットにアクセス可能な Virtual Private Cloud (VPC) が必要です。このチュートリアルのテンプレートではデフォルト VPC が必要です。新しい AWS アカウントには自動で作成されます。デフォルト VPC がない場合や削除されている場合は、トラブルシューティングセクションを参照してください。

---

## コンソールで CloudFormation スタックを作成

### Hello World スタックを作成する手順

1. CloudFormation コンソールを開く  
2. 「Create Stack」を選択  
3. 「Build from Infrastructure Composer」を選択し、次に「Create in Infrastructure Composer」を選択  
   - これにより、CloudFormation コンソールモードの Infrastructure Composer に移動し、テンプレートをアップロードして検証できます  

4. テンプレートのアップロードと検証
「Template」を選択し、以下の CloudFormation テンプレートをテンプレートエディタにコピーして貼り付けます。

```
AWSTemplateFormatVersion: 2010-09-09
Description: CloudFormation Template for WebServer with Security Group and EC2 Instance

Parameters:
  LatestAmiId:
    Description: The latest Amazon Linux 2 AMI from the Parameter Store
    Type: 'AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>'
    Default: '/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2'

  InstanceType:
    Description: WebServer EC2 instance type
    Type: String
    Default: t2.micro
    AllowedValues:
      - t3.micro
      - t2.micro
    ConstraintDescription: must be a valid EC2 instance type.
    
  MyIP:
    Description: Your IP address in CIDR format (e.g. 203.0.113.1/32).
    Type: String
    MinLength: '9'
    MaxLength: '18'
    Default: 0.0.0.0/0
    AllowedPattern: '^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$'
    ConstraintDescription: must be a valid IP CIDR range of the form x.x.x.x/x.

Resources:
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow HTTP access via my IP address
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: !Ref MyIP

  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: !Ref InstanceType
      SecurityGroupIds:
        - !Ref WebServerSecurityGroup
      UserData: !Base64 |
        #!/bin/bash
        yum update -y
        yum install -y httpd
        systemctl start httpd
        systemctl enable httpd
        echo "<html><body><h1>Hello World!</h1></body></html>" > /var/www/html/index.html

Outputs:
  WebsiteURL:
    Value: !Join
      - ''
      - - http://
        - !GetAtt WebServer.PublicDnsName
    Description: Website URL
```


次のステップに進む前に、テンプレートを見ながら CloudFormation の重要な概念を確認しましょう。

Parameters セクションでは、スタックを作成する際にテンプレートに渡す値を宣言します。テンプレート内で後に指定されるリソースは、これらの値を参照して使用します。Parameters は、テンプレート自体に保存したくない情報を指定する効果的な方法です。また、デプロイするアプリケーションや構成ごとに異なる情報を指定する手段としても使えます。

このテンプレートで定義されているパラメータ:

- **LatestAmiId** – AWS Systems Manager Parameter Store から最新の Amazon Linux 2 AMI ID を取得
- **InstanceType** – EC2 インスタンスタイプを選択可能（デフォルト: t2.micro、許可される値: t3.micro, t2.micro）
- **MyIP** – HTTP アクセス用の IP アドレス範囲を指定（デフォルト: 0.0.0.0/0、任意の IP からアクセス可能）

Resources セクションでは、テンプレートで作成する AWS リソースを定義します。リソース宣言をテンプレートに含めることで、スタック作成時にすべてのリソースを一括で作成・設定できます。また、同じテンプレートから新しいスタックを作成することで、同一の構成のリソースを複製できます。

このテンプレートで作成されるリソース:

- **WebServerSecurityGroup** – 指定された IP 範囲からポート 80 への HTTP インバウンドを許可する EC2 セキュリティグループ
- **WebServer** – 以下の構成の EC2 インスタンス  
  - 最新の Amazon Linux 2 AMI を使用  
  - 選択されたインスタンスタイプを適用  
  - SecurityGroupIds プロパティに WebServerSecurityGroup を追加  
  - Apache HTTP Server をインストールするユーザーデータスクリプトを含む

各リソースやパラメータ宣言の先頭には論理名（Logical Name）が指定されています。例えば `WebServerSecurityGroup` は EC2 セキュリティグループの論理名です。テンプレート内の他の場所では `Ref` 関数を使って論理名でリソースやパラメータを参照します。あるリソースが他のリソースを参照する場合、依存関係が作成されます。

Outputs セクションでは、スタック作成後に返されるカスタム値を定義します。スタック内のリソースから情報（リソース ID や URL など）を返す際に使用できます。

このテンプレートで定義される出力:

- **WebsiteURL** – EC2 インスタンスのパブリック DNS 名を使用して構築された Web サーバーの URL。`Join` 関数を使って固定の `http://` と可変の `PublicDnsName` を結合し、Web サーバーのフル URL を簡単に出力できるようにしています。

---


「Validate」を選択して YAML コードが有効であることを確認  
 「Create template」を選択してテンプレートを作成し、S3 バケットに追加  
  ダイアログボックスで S3 バケット名を控える（後で削除可能）  
 「Confirm and continue to CloudFormation」を選択して CloudFormation コンソールに移動（テンプレートの S3 パスが指定されます）  
5. 「Create stack」ページで「Next」を選択  
6. 「Specify stack details」ページで Stack name に名前を入力（例: MyTestStack、空白不可）  

7. Parameters の指定

- **LatestAmiId**: デフォルトで最新の Amazon Linux 2 AMI  
- **InstanceType**: EC2 インスタンスタイプを t2.micro または t3.micro から選択  
  > AWS Free Tier を利用する場合、12 ヶ月間 t2.micro インスタンスを無料で使用可能（t2.micro が利用できないリージョンでは t3.micro）  
- **MyIP**: 実際のパブリック IP アドレスに /32 サフィックスを付与（CIDR 表記で単一の IP アドレスを指定）  

8. 「Next」を 2 回選択して「Review and create（確認と作成）」ページに進みます。このチュートリアルでは、「Configure stack options（スタックオプションの設定）」ページのデフォルト設定はそのままにしておいて構いません。  
9. スタック情報を確認し、問題なければ「Submit」を選択


# スタック作成の監視

`Submit` を選択すると、CloudFormation はテンプレートで指定されたリソースの作成を開始します。  
作成された新しいスタック `MyTestStack` は、CloudFormation コンソールのリスト上部に表示されます。  
ステータスは `CREATE_IN_PROGRESS` となるはずです。  
スタックの詳細なステータスは、イベントを確認することで確認できます。

## スタックのイベントを確認する方法

1. CloudFormation コンソールで、リストからスタック `MyTestStack` を選択します。
2. スタックの詳細ペインで `Events` タブを選択します。
3. コンソールはイベントリストを自動的に 60 秒ごとに最新の状態に更新します。
4. `Events` タブには、スタック作成の主要なステップがイベント発生時刻順に表示され、最新のイベントが上に表示されます。

### イベントの例

最初のイベント（イベントリストの下部）は、スタック作成プロセスの開始を示します。

- 2024-12-23 18:54 UTC-7 MyTestStack CREATE_IN_PROGRESS User initiated

次に、各リソースの作成開始と完了を示すイベントが表示されます。たとえば、EC2 インスタンス作成のイベントは以下の通りです。

- 2024-12-23 18:59 UTC-7 WebServer CREATE_COMPLETE
- 2024-12-23 18:54 UTC-7 WebServer CREATE_IN_PROGRESS Resource creation initiated

- `CREATE_IN_PROGRESS` は、CloudFormation がリソースの作成を開始したことを示します。
- `CREATE_COMPLETE` は、リソースの作成が正常に完了したことを示します。

スタックが正常に作成されると、`Events` タブの上部に以下のイベントが表示されます。

- 2024-12-23 19:17 UTC-7 MyTestStack CREATE_COMPLETE

もし CloudFormation がリソースを作成できない場合は、`CREATE_FAILED` イベントが報告され、デフォルトではスタックのロールバックが行われ、作成されたリソースは削除されます。`Status Reason` 列には、失敗の原因が表示されます。

## 作成されたリソースの確認

スタック作成後は、`Resources` タブで作成された EC2 インスタンスやセキュリティグループを確認できます。





# Webサーバのテスト

スタックが正常に作成されたら、CloudFormation コンソールの `Outputs` タブに移動します。  
`WebsiteURL` フィールドを確認してください。このフィールドには、作成された EC2 インスタンスのパブリック URL が含まれています。

ブラウザを開き、`WebsiteURL` に表示されている URL にアクセスします。  
ブラウザに「Hello World!」と表示されれば、EC2 インスタンスで Apache HTTP Server が正常に動作していることが確認できます。

# トラブルシューティング

スタック作成中にロールバックが発生した場合は、VPC が存在しないことが原因の可能性があります。

## デフォルト VPC が存在しない場合

このチュートリアルのテンプレートではデフォルト VPC が必要です。  
VPC やサブネットのエラーでスタック作成が失敗する場合、以下の方法があります。

1. **新しいデフォルト VPC を作成する**  
   Amazon VPC コンソールから新しいデフォルト VPC を作成します。詳細は Amazon VPC ユーザーガイドの「Create a default VPC」を参照してください。

2. **テンプレートを変更してサブネットを指定する**  
   デフォルトでない VPC を使用する場合、テンプレートに VPC とサブネットの ID を明示的に指定します。  
   追加するパラメータ例：

```
  SubnetId:
    Description: The subnet ID to launch the instance into
    Type: AWS::EC2::Subnet::Id
```
   さらに WebServer リソースにサブネット ID を追加します。ユーザーデータスクリプトはそのまま使用できます。

```
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: !Ref InstanceType
      SecurityGroupIds:
        - !Ref WebServerSecurityGroup
      SubnetId: !Ref SubnetId
      UserData: !Base64 |
        #!/bin/bash
        yum update -y
        yum install -y httpd
        systemctl start httpd
        systemctl enable httpd
        echo "<html><body><h1>Hello World!</h1></body></html>" > /var/www/html/index.html
```

# クリーンアップ

不要なサービスの課金を避けるため、作成したスタックとリソースは削除します。  
また、スタックのテンプレートを保存した S3 バケットも削除できます。

## スタックとリソースの削除

1. CloudFormation コンソールを開きます。
2. スタック一覧で `MyTestStack` の横にあるチェックボックスを選択し、`Delete` をクリックします。
3. 確認を求められたら、再度 `Delete` を選択します。
4. `Event` タブで削除の進行状況を確認します。  
   ステータスは `DELETE_IN_PROGRESS` に変わり、削除完了後、リストからスタックが消えます。

## S3 バケットの削除

1. Amazon S3 コンソールを開きます。
2. ナビゲーションペインで `Buckets` を選択します。
3. 作成したバケットの横にあるチェックボックスを選択し、`Empty` をクリックします。
4. `permanently delete` と入力して、バケット内のオブジェクトを削除します。
5. バケットが空になったら、再度バケットを選択し `Delete bucket` をクリックします。
6. 確認としてバケット名を入力し、`Delete bucket` を選択します。
7. 削除が完了すると、バケット一覧から対象バケットが消えます。

# 次のステップ

おめでとうございます！  
スタックを作成し、作成状況を監視し、出力を確認することができました。

## 学習を続けるには

- **テンプレートについてさらに学ぶ**  
  自分で CloudFormation テンプレートを作成できるように、CloudFormation テンプレートの操作方法について学んでください。  
  詳細は「Working with CloudFormation templates」を参照してください。

- **ハンズオンでの練習**  
  「Getting Started with AWS CloudFormation」ワークショップを試して、テンプレート作成の実践的な練習を行いましょう。

- **簡易版での学習**  
  「Deploy applications on Amazon EC2」では、CloudFormation ヘルパースクリプト `cfn-init` を使用して Amazon EC2 インスタンスをブートストラップする同じシナリオを短くまとめています。




