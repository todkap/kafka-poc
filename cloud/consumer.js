let kafka =require("kafka-node");
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const client = new kafka.KafkaClient({kafkaHost: 'localhost:29092'});

logger.info('Cloud consumer initalized..');
const topics = [{
    topic: 'todd-sample-interval-test',
    offset: 0, //default 0
    partition: 0 // default 0
 }];

const options = {
    autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);
consumer.on('ready', function(message) {
    logger.info('cloud consumer is ready');
});
consumer.on('message', function(message) {
   logger.info('cloud consumer',  message);
});

consumer.on('error', function(err) {
    logger.info('error', err);
});