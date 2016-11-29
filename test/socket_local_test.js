// instruction fo server testing:
// in root directory: run script 'npm start' to start the server
// then run 'npm test' to run test
var should = require('should');
var io = require('socket.io-client');
var expect = require('chai').expect;
var server = require('../index');

var socketURL = 'http://localhost:3000';
var options ={
  transports: ['websocket'],
  'force new connection': true
};
var client;

describe('socket server testing', function() {
	beforeEach(() => {
	  client = io.connect(socketURL, options);
	});

	afterEach(() => {
		console.log('disconnecting');
		client.disconnect();
	});

  it('Server should send back an object with basic userInfo, when user tries to login with a new username', (done) => {
    var playerId = 'traderJoe';

    client.on('connect', () => {
      client.emit('loginTempUser', playerId);
      client.on('newTempUser', function(data) {
	    	data.should.have.properties('username', 'tempUniqUserId', 'status', 'userCode');
	    	data.username.should.be.a.String;
	    	data.tempUniqUserId.should.be.a.String;
	    	data.status.should.be.a.Boolean;
	    	data.userCode.should.be.a.Number;
	    	data.username.should.equal(playerId);
	    	data.status.should.equal(true);
	    	data.userCode.should.be.within(1, 12);
	    	done();
	  	}); 
    });
  });

  // it('', (done) => {
  // 	done();
  // });
});
