var redis = require('redis');
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var runDataBase = function () {
  
  var client = redis.createClient();

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });
  client.on("error", function (err) {
      console.log("Error starting db" + err);
  });

  //commands to test is database is connected properly
  client.set("test key", "test val", redis.print);
  client.getAsync('test key').then(function(res) {
      console.log(res, ' yay redis is running'); // => 'test val'
  });


  client.zadd("leaderboard", 1, "Alice", "date");
  client.zadd("leaderboard", 100, "Bob");
  client.zadd("leaderboard", 300, "Carol");

  client.zrevrangeAsync('leaderboard', 0, 9, "withscores").then(function(res) {
      console.log(res, '  returning leaderboard results');
  });


  return;
}


module.exports = runDataBase;