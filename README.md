# kafka-poc
Simple POC to simulate proxying of Kafka messages between two Kafka deployments (local and cloud)


## Deployment
This project contains two docker-compose yml files to represent the two dockerized deployments.   To support the local POC, each has unique ports exposed.

**Local Deployment**
```
kakfa-deploy/zk-single-kafka-single-local.yml
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

## Sample Ouput
**local/producer**
```
[2020-04-08T16:26:46.845] [INFO] default - Store producer sent message ->  { 'todd-sample-interval-test': { '0': 115 } }
[2020-04-08T16:26:56.846] [INFO] default - Store producer sent message ->  { 'todd-sample-interval-test': { '0': 116 } }
[2020-04-08T16:27:06.850] [INFO] default - Store producer sent message ->  { 'todd-sample-interval-test': { '0': 117 } }
[2020-04-08T16:27:16.851] [INFO] default - Store producer sent message ->  { 'todd-sample-interval-test': { '0': 118 } }
[2020-04-08T16:27:26.854] [INFO] default - Store producer sent message ->  { 'todd-sample-interval-test': { '0': 119 } }
```
**local/local-proxy**
```[2020-04-08T16:27:46.862] [INFO] default - store proxy sent { 'todd-sample-interval-test': { '0': 177 } }
[2020-04-08T16:27:56.858] [INFO] default - Message:  {
  topic: 'todd-sample-interval-test',
  value: 'Wed Apr 08 2020 16:27:56 GMT-0400 (Eastern Daylight Time)',
  offset: 122,
  partition: 0,
  highWaterOffset: 123,
  key: null,
  timestamp: 2020-04-08T20:27:56.853Z
}
[2020-04-08T16:27:56.862] [INFO] default - store proxy sent { 'todd-sample-interval-test': { '0': 178 } }
```

**cloud/consumer**
```
[2020-04-08T16:28:06.866] [INFO] default - cloud consumer {
  topic: 'todd-sample-interval-test',
  value: '[object Object]',
  offset: 179,
  partition: 0,
  highWaterOffset: 180,
  key: null
}
[2020-04-08T16:28:16.871] [INFO] default - cloud consumer {
  topic: 'todd-sample-interval-test',
  value: '[object Object]',
  offset: 180,
  partition: 0,
  highWaterOffset: 181,
  key: null
}
[2020-04-08T16:28:26.872] [INFO] default - cloud consumer {
  topic: 'todd-sample-interval-test',
  value: '[object Object]',
  offset: 181,
  partition: 0,
  highWaterOffset: 182,
  key: null
}
```


