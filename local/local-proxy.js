let kafka = require('kafka-node');

const localClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const cloudClient = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const Producer = kafka.Producer;
const producer = new Producer(cloudClient);

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';


logger.info('Initialised..');
const topics = [{
  topic: 'todd-sample-interval-test',
  offset: 0, //default 0
  partition: 0 // default 0
}];
const options = {
  autoCommit: true
};
const consumer = new kafka.Consumer(localClient, topics, options);

consumer.on('ready', function (message) {
  logger.info('store proxy', 'I am ready to receive messages');
});

producer.on('ready', function (message) {
  logger.info('store proxy', 'I am ready to send messages');
});

consumer.on('message', function (message) {
  logger.info('Message: ', message);
  let payloads = [
    {
      topic: 'todd-sample-interval-test',
      messages: message
    }
  ];
  producer.send(payloads, (err, data) => {
    if (err) {
      logger.info('store proxy', '[kafka-producer error -> ' + err + ']: broker update failed');
    } else {
      logger.info('store proxy sent', data);
    }
  });
});

consumer.on('error', function (err) {
  logger.info('error', err);
});