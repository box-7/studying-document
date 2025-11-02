# AWS::EC2::InternetGateway

VPCで使用するためのインターネットゲートウェイを割り当てます。インターネットゲートウェイを作成した後、それをVPCにアタッチします。

構文（YAML）  
このエンティティをAWS CloudFormationテンプレートで宣言するには、次の構文を使用します：

```
Type: AWS::EC2::InternetGateway
Properties:
  Tags: 
    - Tag
```
```
Properties

Tags
インターネットゲートウェイに付与するタグ。
Required: No
Type: Array of Tag
Update requires: No interruption
Update requires: No interruption（更新時に停止不要）
```
### 戻り値

Ref  
このリソースの論理IDを Ref 関数に渡すと、インターネットゲートウェイのID が返されます。

Fn::GetAtt  
InternetGatewayId — インターネットゲートウェイのIDを返します。

例

インターネットゲートウェイを作成し、タグを付与する例：
```
myInternetGateway:
  Type: AWS::EC2::InternetGateway
  Properties:
    Tags:
      - Key: stack
        Value: production
```
関連情報

AWS::EC2::VPCGatewayAttachment
　→ インターネットゲートウェイをVPCに関連付けるために使用

Internet Gateways in the Amazon VPC User Guide