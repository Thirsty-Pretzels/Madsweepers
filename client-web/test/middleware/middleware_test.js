import io, { server }from 'socket.io';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import startBoard, { boardMiddleware } from '../../src/middlewares/updateBoard';
import { SocketIO, Server } from 'mock-socket';

var expect = chai.expect;
chai.use(sinonChai);

var socketURL = 'http://localhost:3000';
var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe('Test Suite for MiddleWare', () => {
  let store, next, action;
  let url = 'http://localhost:3000';

  beforeEach(() => {
    store = {};
    next = sinon.stub();
  });

  afterEach(() => {

  });

  it('action should be passed to next middleware to the next middleware', () => {
    action = { type: 'loginTempUser' };
    boardMiddleware(store)(next)(action);
    expect(next).to.have.been.calledWith(action);
  });

  it('basic test: action should be passed', () => {
    var app = require('express')();
    var http = require('http').Server(app);
    var server = require('socket.io')(http);

    server.on('connection', userSocket => {
      console.log('someone connected.');
    });

    http.listen(3000, function(){
      console.log(`IAM listening on *:${port}, AMA`);
    });

    global.socket = io.connect('http://localhost:3000');
    // action = { type: 'LOGIN-TEMP-USER', payload: 'traderJoe'};
    // boardMiddleware(store)(next)(action);

    http.close();
  });
});