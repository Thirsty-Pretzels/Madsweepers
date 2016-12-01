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

// this function gets top 10 results from db. The response is already sorted by redis 
var getHighScoresFromDb = (io) => {
  db.zrevrangeAsync('leaderboard', 0, 9, "withscores").then(function(res) {
    console.log(res, 'getting high scores from db');
    if (res.length === 0) {
      // hardcode mock data if database is not returning any results
      res = ["minehannnn", "99", "Yo_wassup", "90", "thisisMJ", "45", "timzeng", "40", "angrybird", "36"];
    }
    io.emit('getHighScores', res);
  });
}

var saveHighScoresInDb = (scores) => {
  // finalScores: [ { id: 'mj', scoreChange: -15 } ]
  console.log(scores, 'received scores to save into DB');
  // prevent function from executing if no scores are sent
  if (scores.length > 0) {
    scores.forEach(({id, scoreChange}) => {db.zadd("leaderboard", scoreChange, id)});
  }
}


module.exports = {
  db: db,
  runDataBase: runDataBase,
  getHighScoresFromDb: getHighScoresFromDb,
  saveHighScoresInDb: saveHighScoresInDb
}

