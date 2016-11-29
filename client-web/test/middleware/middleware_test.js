import io from 'socket.io';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import startBoard, { boardMiddleware } from '../../src/middlewares/updateBoard';
import { WebSocket, Server, SocketIO } from 'mock-socket';

var expect = chai.expect;
chai.use(sinonChai);

var socketURL = 'http://localhost:3000';
var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe('Test Suite for MiddleWare', () => {
  let store, next, action, mockServer;
  let url = 'http://localhost:3000';

  beforeEach(() => {
    store = {};
    next = sinon.stub();
  });

  it('action should be passed to next middleware to the next middleware', () => {
    action = { type: 'loginTempUser' };
    boardMiddleware(store)(next)(action);
    expect(next).to.have.been.calledWith(action);
  });

  it('basic test: action should be passed', () => {
    console.log('I am here');

    mockServer = new Server(url);

    mockServer.on('connection', (server, userSocket) => {
      console.log('connection is established');
      userSocket.on('loginTempUser', (data) => {
        console.log(data);
      });
    });

    global.socket = io(url);

    action = { type: 'LOGIN-TEMP-USER', payload: 'traderJoe'};
    boardMiddleware(store)(next)(action);

    setTimeout(() => {
      mockServer.stop();
    }, 100);
  });
});

// chat.js
// function Chat() {
//   const chatSocket = new WebSocket('ws://localhost:8080');
//   this.messages = [];

//   chatSocket.onmessage = (event) => {
//     this.messages.push(event.data);
//   };
// }

// describe('Chat Unit Test', () => {
//   it('basic test', (done) => {
//     const mockServer = new Server('ws://localhost:8080');
//     mockServer.on('connection', server => {
//       mockServer.send('test message 1');
//       mockServer.send('test message 2');
//     });

//     // Now when Chat tries to do new WebSocket() it
//     // will create a MockWebSocket object \
//     var chatApp = new Chat();

//     setTimeout(() => {
//       const messageLen = chatApp.messages.length;
//       assert.equal(messageLen, 2, '2 messages where sent from the s server');

//       mockServer.stop(done);
//     }, 100);
//   });
// });