import io from 'socket.io-client';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import startBoard, { boardMiddleware } from '../../src/middlewares/updateBoard';

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
    global.socket = io.connect(socketURL, options);
  });

  afterEach(() => {
    socket.disconnect();
  });

  it('action should be passed to next middleware to the next middleware', () => {
    action = { type: 'loginTempUser' };
    boardMiddleware(store)(next)(action);
    expect(next).to.have.been.calledWith(action);
  });

  // it('action should be passed', () => {
  //   action = { type: 'loginTempUser', username: 'traderJoe'};
  //   boardMiddleware(store)(next)(action);
    
  // });
});