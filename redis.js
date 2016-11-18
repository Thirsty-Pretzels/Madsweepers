var redis = require('redis');
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var db = redis.createClient();

var runDataBase = () => {

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });
  db.on("error", function (err) {
      console.log("Error starting db" + err);
  });

  //dev commands to test is database is connected properly
  db.set("test key", "test val", redis.print);
  db.getAsync('test key').then(function(res) {
      console.log(res, ' yay redis is running'); // => 'test val'
  });

  return;
}

var getHighScoresFromDb = (io) => {
  db.zrevrangeAsync('leaderboard', 0, 9, "withscores").then(function(res) {
    console.log(res, 'getting high scores from db');
    io.emit('getHighScores', res);
  });
}

var saveHighScoresInDb = (scores) => {
  // finalScores: [ { id: 'mj', score: -15 } ]
  console.log(scores, 'received scores to save into DB');
  scores.forEach(({id, score}) => {db.zadd("leaderboard", score, id)});
}


module.exports = {
  runDataBase: runDataBase,
  db: db,
  getHighScoresFromDb: getHighScoresFromDb,
  saveHighScoresInDb: saveHighScoresInDb
}