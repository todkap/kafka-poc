const kafka = require('kafka-node');
const kafka_topic = 'sample';

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

logger.info('Store producer initialised..');
producer.on('ready', function () {
  let num = 0;
  setInterval(() => {
    let payloads = [
      {
        topic: 'todd-sample-interval-test',
        messages: new Date()
      }
    ];
    producer.send(payloads, (err, data) => {
      if (err) {
        logger.info('Store producer', '[kafka-producer -> ' + kafka_topic + ']: broker update failed');
      } else {
        logger.info('Store producer sent message -> ', data);
      }
    });
    num++;
  }, 10000);

});

