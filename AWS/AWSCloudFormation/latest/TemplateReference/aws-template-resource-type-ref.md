
# AWS resource and property types reference
https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-template-resource-type-ref.html

```
リソースタイプやプロパティのリファレンス（aws-template-resource-type-ref.md）
用途:
　CloudFormationテンプレートで「どんなリソースが使えるか」「書き方は？」を調べたいときに使います。
できること:
　テンプレートに記述できるリソースやプロパティの詳細を確認できます。
リソース作成方法:
　このリファレンスを見ながらYAML/JSONファイルを書く → そのファイルをコマンドで実行してリソースを一括作成します。
```

# AWS リソースおよびプロパティタイプリファレンス

これは新しい AWS CloudFormation テンプレートリファレンスガイドです。
ブックマークやリンクを更新してください。
CloudFormation の使用を開始する方法については、AWS CloudFormation ユーザーガイドを参照してください。

このセクションには、AWS CloudFormation がサポートするすべての AWS リソースタイプおよびプロパティタイプのリファレンス情報が含まれています。

リソースタイプ識別子

リソースタイプ識別子は、常に次の形式を取ります。

```
service-provider::service-name::data-type-name
```

# サービスリソースタイプ

- **AWS Amplify Console**  
- **AWS Amplify UI Builder**  
- **Amazon API Gateway**  
- **Amazon API Gateway V2**  
- **AWS AppConfig**  
- **Amazon AppFlow**  
- **Amazon AppIntegrations**  
- **Application Auto Scaling**  
- **AWS App Mesh**  
- **AWS App Runner**  
- **Amazon AppStream 2.0**  
- **AWS AppSync**  
- **ARCRegionSwitch**  
- **AWS ARC - Zonal Shift**  
- **Alexa Skills Kit**  
- **Amazon Athena**  
- **AWS Audit Manager**  
- **AWS Auto Scaling**  
- **AWS B2B Data Interchange**  
- **AWS Backup**  
- **AWS Backup gateway**  
- **AWS Batch**  
- **Amazon Bedrock**  
- **Bedrock AgentCore**  
- **AWS Billing**  
- **AWS Billing Conductor**  
- **AWS Budgets**  
- **AWS Certificate Manager**  
- **Amazon Q Developer in chat applications**  
- **AWS Clean Rooms**  
- **CleanRoomsML**  
- **AWS Cloud9**  
- **AWS CloudFormation**  
- **Amazon CloudFront**  
- **AWS Cloud Map**  
- **AWS CloudTrail**  
- **CloudWatch**  
- **Amazon CloudWatch Application Insights**  
- **CloudWatch Application Signals**  
- **Amazon CloudWatch Evidently**  
- **Amazon CloudWatch Internet Monitor**  
- **CloudWatch investigations**  
- **CloudWatch Logs**  
- **CloudWatch Observability Admin**  
- **CloudWatch Synthetics**  
- **AWS CodeArtifact**  
- **AWS CodeBuild**  
- **AWS CodeCommit**  
- **AWS CodeConnections**  
- **AWS CodeDeploy**  
- **Amazon CodeGuru Profiler**  
- **Amazon CodeGuru Reviewer**  
- **AWS CodePipeline**  
- **AWS CodeStar**  
- **AWS CodeStar Connections**  
- **AWS CodeStar Notifications**  
- **Amazon Cognito**  
- **Amazon Comprehend**  
- **AWS Config**  
- **Amazon Connect**  
- **Amazon Connect Outbound Campaigns**  
- **Amazon Connect Outbound Campaigns V2**  
- **AWS Control Tower**  
- **Amazon Connect Customer Profiles**  
- **AWS Cost Explorer**  
- **AWS Cost and Usage Report**  
- **AWS Data Exports**  
- **Amazon Data Lifecycle Manager**  
- **AWS Data Pipeline**  
- **AWS DataSync**  
- **Amazon DataZone**  
- **AWS Deadline Cloud**  
- **DynamoDB Accelerator**  
- **Amazon Detective**  
- **AWS Device Farm**  
- **Amazon DevOps Guru**  
- **AWS Directory Service**  
- **AWS Database Migration Service**  
- **Amazon DocumentDB (MongoDB 互換)**  
- **Amazon DocumentDB (MongoDB 互換) Elastic**  
- **Amazon Aurora DSQL**  
- **Amazon DynamoDB**  
- **Amazon EC2**  
- **Amazon EC2 Auto Scaling**  
- **Amazon ECR**  
- **Amazon ECS**  
- **Amazon Elastic File System**  
- **Amazon Elastic Kubernetes Service (EKS)**  
- **AWS Elastic Beanstalk**  
- **Elastic Load Balancing**  
- **Elastic Load Balancing V2**  
- **Amazon EMR**  
- **Amazon EMR Serverless**  
- **Amazon EMR on EKS**  
- **Amazon ElastiCache**  
- **Amazon Elastic VMware Service**  
- **AWS Entity Resolution**  
- **Amazon EventBridge**  
- **Amazon EventBridge Pipes**  
- **Amazon EventBridge Scheduler**  
- **Amazon EventBridge Schemas**  
- **Amazon FinSpace Schemas**  
- **AWS Fault Injection Service**  
- **AWS Firewall Manager**  
- **Amazon Forecast**  
- **Amazon Fraud Detector**  
- **Amazon FSx**  
- **Amazon GameLift Servers**  
- **Amazon GameLift Streams**  
- **AWS Global Accelerator**  
- **AWS Glue**  
- **AWS Glue DataBrew**  
- **Amazon Managed Grafana**  
- **AWS Ground Station**  
- **Amazon GuardDuty**  
- **AWS HealthImaging**  
- **AWS HealthLake**  
- **AWS HealthOmics**  
- **AWS Identity and Access Management (IAM)**  
- **AWS IAM Identity Center**  
- **Identity Store**  
- **AWS IAM Access Analyzer**  
- **EC2 Image Builder**  
- **AWS Systems Manager Incident Manager**  
- **AWS Systems Manager Incident Manager Contacts**  
- **Amazon Inspector Classic**  
- **Amazon Inspector**  
- **AWS Invoicing**  
- **AWS IoT**  
- **AWS IoT Analytics**  
- **AWS IoT Core Device Advisor**  
- **AWS IoT Events**  
- **Fleet Hub for AWS IoT Device Management**  
- **AWS IoT FleetWise**  
- **Managed integrations for AWS IoT Device Management**  
- **AWS IoT Greengrass**  
- **AWS IoT Greengrass Version 2**  
- **AWS IoT SiteWise**  
- **AWS IoT TwinMaker**  
- **AWS IoT Wireless**  
- **Amazon IVS**  
- **Amazon IVS Chat**  
- **Amazon Kendra**  
- **Amazon Kendra Intelligent Ranking**  
- **Amazon Keyspaces (for Apache Cassandra)**  
- **Amazon Kinesis**  
- **Amazon Managed Service for Apache Flink**  
- **Amazon Managed Service for Apache Flink V2**  
- **Amazon Data Firehose**  
- **Amazon Kinesis Video Streams**  
- **AWS Key Management Service (KMS)**  
- **AWS Lake Formation**  
- **AWS Lambda**  
- **AWS Launch Wizard**  
- **Amazon Lex**  
- **AWS License Manager**  
- **Amazon Lightsail**  
- **Amazon Location Service**  
- **Amazon Lookout for Equipment**  
- **Amazon Lookout for Metrics**  
- **Amazon Lookout for Vision**  
- **AWS Mainframe Modernization**  
- **AWS Mainframe Modernization Application Testing**  
- **Amazon Macie**  
- **Amazon Managed Blockchain**  
- **AWS Elemental MediaConnect**  
- **AWS Elemental MediaConvert**  
- **AWS Elemental MediaLive**  
- **AWS Elemental MediaPackage**  
- **AWS Elemental MediaPackage V2**  
- **AWS Elemental MediaTailor**  
- **AWS Elemental MediaStore**  
- **Amazon MQ**  
- **Amazon MemoryDB**  
- **Multi-party approval**  
- **Amazon Managed Streaming for Apache Kafka**  
- **Amazon Managed Streaming for Apache Kafka Connect**  
- **Amazon Managed Workflows for Apache Airflow**  
- **Amazon Neptune**  
- **Amazon Neptune Analytics**  
- **AWS Network Firewall**  
- **AWS Network Manager**  
- **Notifications**  
- **NotificationsContacts**  
- **Observability Access Manager (OAM)**  
- **Oracle Database@AWS**  
- **Amazon OpenSearch Ingestion**  
- **Amazon OpenSearch Service**  
- **Amazon OpenSearch Service (旧 Elasticsearch リソース)**  
- **Amazon OpenSearch Serverless**  
- **AWS Organizations**  
- **AWS PCS**  
- **AWS Panorama**  
- **AWS Payment Cryptography**  
- **Amazon Personalize**  
- **Amazon Pinpoint**  
- **Amazon Pinpoint Email**  
- **AWS Private Certificate Authority**  
- **AWS Private Certificate Authority for Active Directory**  
- **AWS Private Certificate Authority Connector for SCEP**  
- **AWS Proton**  
- **Amazon Managed Service for Prometheus**  
- **Amazon Q Business**  
- **Amazon QLDB**  
- **QuickSight**  
- **AWS Resource Access Manager**  
- **Recycle Bin**  
- **Amazon Relational Database Service (RDS)**  
- **Amazon Redshift**  
- **Amazon Redshift Serverless**  
- **AWS Migration Hub Refactor Spaces**  
- **Amazon Rekognition**  
- **AWS Resilience Hub**  
- **AWS Resource Explorer**  
- **AWS Resource Groups**  
- **IAM Roles Anywhere**  
- **Amazon Route 53**  
- **Amazon Route 53 Recovery Control**  
- **Amazon Route 53 Recovery Readiness**  
- **Amazon Route 53 Resolver**  
- **Amazon Route 53 Profiles**  
- **CloudWatch RUM**  
- **Amazon S3**  
- **Amazon S3 Express**  
- **Amazon S3 Object Lambda**  
- **Amazon S3 on Outposts**  
- **Amazon S3 Tables**  
- **Amazon SageMaker AI**  
- **AWS Secrets Manager**  
- **Amazon Security Lake**  
- **AWS Service Catalog**  
- **AWS Service Catalog AppRegistry**  
- **AWS Security Hub**  
- **Amazon Simple Email Service (SES)**  
- **Amazon SimpleDB**  
- **AWS Shield**  
- **AWS Signer**  
- **AWS SimSpace Weaver**  
- **AWS End User Messaging SMS**  
- **Amazon Simple Notification Service (SNS)**  
- **Amazon Simple Queue Service (SQS)**  
- **AWS Step Functions**  
- **AWS Systems Manager (SSM)**  
- **AWS Systems Manager GUI Connect**  
- **AWS Systems Manager Quick Setup**  
- **AWS Support App**  
- **AWS Systems Manager for SAP**  
- **Amazon Timestream**  
- **AWS Transfer Family**  
- **Amazon Verified Permissions**  
- **Amazon Connect Voice ID**  
- **Amazon VPC Lattice**  
- **AWS WAF**  
- **AWS WAF Regional**  
- **AWS WAF V2**  
- **Amazon Connect Wisdom**  
- **Amazon WorkSpaces**  
- **Amazon WorkSpaces Thin Client**  
- **Amazon WorkSpaces Secure Browser**  
- **AWS X-Ray**
- **Shared property types**











