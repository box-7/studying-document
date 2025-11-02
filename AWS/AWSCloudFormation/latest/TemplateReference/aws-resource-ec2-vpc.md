# AWS::EC2::VPC

---

AWS CloudFormation Template Reference Guide より。  
以下は、`AWS::EC2::VPC` リソースの仕様に関する詳細な説明。

---

## 概要

仮想プライベートクラウド（VPC）を指定します。  
VPC には関連付けられた IPv4 CIDR ブロックが必要です。  
IPv4 CIDR ブロック、または IPAM によって割り当てられた IPv4 CIDR ブロックを指定できます。  
VPC に IPv6 CIDR ブロックを関連付けるには、`AWS::EC2::VPCCidrBlock` を参照してください。

詳細については、**Amazon VPC ユーザーガイド**の「Virtual private clouds (VPC)」を参照。

---

## 構文

CloudFormation テンプレート内でこのエンティティを宣言するには、以下の構文を使用します。

### YAML
```
Type: AWS::EC2::VPC
Properties:
        CidrBlock: String
        EnableDnsHostnames: Boolean
        EnableDnsSupport: Boolean
        InstanceTenancy: String
        Ipv4IpamPoolId: String
        Ipv4NetmaskLength: Integer
        Tags:
                - Tag
```
---

## プロパティ

### **CidrBlock**
VPC の IPv4 ネットワーク範囲（CIDR表記）。  
例: `10.0.0.0/16`  
指定された CIDR ブロックは正規化されます。  
たとえば `100.68.0.18/18` を指定した場合、`100.68.0.0/18` に変換されます。

`CidrBlock` または `Ipv4IpamPoolId` のいずれかを指定する必要があります。

- **必須**: 条件付き  
- **型**: String  
- **更新要件**: Replacement（置き換え）

---

### **EnableDnsHostnames**
VPC 内で起動されたインスタンスが DNS ホスト名を取得するかどうかを示します。  
有効にすると、インスタンスは DNS ホスト名を取得します。  
デフォルトでは無効（非デフォルトVPCの場合）。  
詳細は「DNS attributes in your VPC」を参照。

DNSホスト名を有効にするには、DNSサポートも有効にしておく必要があります。

- **必須**: いいえ  
- **型**: Boolean  
- **更新要件**: No interruption（中断なし）

---

### **EnableDnsSupport**
VPC で DNS 解決をサポートするかどうかを示します。  
有効にすると、169.254.169.253 または VPC ネットワーク範囲のベース＋2 の予約 IP アドレスに対する Amazon 提供 DNS サーバーへのクエリが成功します。  
無効にすると、Amazon 提供のパブリック DNS 名前解決サービスは無効化されます。  
デフォルトで有効です。

詳細は「DNS attributes in your VPC」を参照。

- **必須**: いいえ  
- **型**: Boolean  
- **更新要件**: No interruption

---

### **InstanceTenancy**
VPC に起動されるインスタンスの許可されるテナンシー。

- `default`: デフォルトでは共有ハードウェア上で動作。  
- `dedicated`: デフォルトで専用ハードウェア上で動作。  

`default` → `dedicated` に変更する場合は **置き換えが必要**。  
`dedicated` → `default` の場合は置き換え不要。

- **必須**: いいえ  
- **型**: String  
- **許可値**: `default` | `dedicated` | `host`  
- **更新要件**: Some interruptions（中断あり）

---

### **Ipv4IpamPoolId**
VPC の CIDR を割り当てるために使用する IPv4 IPAM プールの ID。  
詳細は「What is IPAM?」を参照。

`CidrBlock` または `Ipv4IpamPoolId` のいずれかを指定する必要があります。

- **必須**: 条件付き  
- **型**: String  
- **更新要件**: Replacement

---

### **Ipv4NetmaskLength**
Amazon VPC IP Address Manager (IPAM) プールからこの VPC に割り当てる IPv4 CIDR のネットマスク長。  
詳細は「What is IPAM?」を参照。

- **必須**: いいえ  
- **型**: Integer  
- **更新要件**: Replacement

---

### **Tags**
VPC に付与するタグ。

- **必須**: いいえ  
- **型**: Array of Tag  
- **更新要件**: No interruption

---

## 戻り値

### **Ref**
`Ref` 関数にこのリソースの論理IDを渡すと、VPC の ID が返されます。

例: `vpc-123abc`

詳細は「Ref」関数を参照。

---

### **Fn::GetAtt**
`Fn::GetAtt` 関数を使うと、このリソースの特定の属性を取得できます。

取得可能な属性と例:

| 属性名 | 内容 |
|--------|------|
| `CidrBlock` | VPC のプライマリ IPv4 CIDR ブロック（例: 10.0.0.0/16） |
| `CidrBlockAssociations` | IPv4 CIDR ブロックの関連付け ID （例: [ vpc-cidr-assoc-0280ab6b ]） |
| `DefaultNetworkAcl` | デフォルトネットワーク ACL の ID（例: acl-814dafe3） |
| `DefaultSecurityGroup` | デフォルトセキュリティグループの ID（例: sg-b178e0d3） |
| `Ipv6CidrBlocks` | IPv6 CIDR ブロック（例: [ 2001:db8:1234:1a00::/56 ]） |
| `VpcId` | VPC の ID |

詳細は「Fn::GetAtt」関数を参照。

---

## 例

### IPv4 CIDR ブロックを持つ VPC の作成

```
**YAML**
Resources:
        myVPC:
                Type: AWS::EC2::VPC
                Properties:
                CidrBlock: 10.0.0.0/16
                EnableDnsSupport: 'true'
                EnableDnsHostnames: 'true'
                Tags:
                        - Key: stack
                        Value: production
```

---

### IPv4 および IPv6 CIDR ブロックを持つ VPC の作成


**YAML**
```
Resources:
        myVPC:
                Type: AWS::EC2::VPC
                Properties:
                        CidrBlock: 10.0.0.0/16
                        EnableDnsSupport: 'true'
                        EnableDnsHostnames: 'true'
                        Tags:
                                - Key: stack
                                Value: production
        ipv6CidrBlock:
                Type: AWS::EC2::VPCCidrBlock
                Properties:
                        VpcId: !Ref myVPC
                        AmazonProvidedIpv6CidrBlock: true
```
---

## 関連項目

- [CreateVpc (Amazon EC2 API Reference)](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateVpc.html)
- [VPC and subnets (Amazon VPC User Guide)](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)