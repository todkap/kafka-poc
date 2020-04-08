# kafka-poc
Simple POC to simulate proxying of Kafka messages between two Kafka deployments (local and cloud)


## Deployment
This project contains two docker-compose yml files to represent the two cloud deployments.   To support the local POC, each has unique ports exposed.

**Local Deployment**
```
kakfa-deploy/zk-single-kafka-single-cloud.yml
```
**Cloud Deployment**
```
kakfa-deploy/zk-single-kafka-single-cloud.yml
```

## Applications
There are three applications included in this project. The first two are for handling the processing of local messages that are published through the local Kafka broker and are located in the `local` directory.  

**Local Applications**
```
local/producer.js
local/local-proxy.js
```
The 3rd application subscribes the cloud Kafka and just dumps the message that it receives.

**Cloud Application**
```
cloud/consumer.js
```
