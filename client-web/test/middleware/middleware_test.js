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


describe('Test Suite for MiddleWare', function(){
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

  it('action should be passed to next middleware to the next middleware', function(){
    action = { type: 'loginTempUser' };
    boardMiddleware(store)(next)(action);
    expect(next).to.have.been.calledWith(action);
  });

  // describe('when action is with CALL_API', function(){
  //   let nockScope;
  //   beforeEach(function(){
  //     nockScope = nock(http://the-url)
  //                   .get('/path');
  //   });
  //   afterEach(function(){
  //     nock.cleanAll();
  //   });
  //   it('sends request to path with query and body', function(){
  //     nockScope = nockScope.reply(200, { status: 'ok' });

  //     apiMiddleware(store)(next)(action);

  //     nockScope.done();
  //   });

  //   it('resolves returned promise when response when success', function(){
  //     nockScope = nockScope.reply(200, { status: 'ok' });

  //     let promise = apiMiddleware(store)(next)(action);

  //     return expect(promise).to.be.fulfilled;
  //   });
  //   it('dispatch successType with response when success', function(done){
  //     nockScope = nockScope.reply(200, { status: 'ok' });
  //     let promise = apiMiddleware(store)(next)(action);

  //     promise.then(()=> {
  //       expect(next).to.have.been.calledWith({
  //         type: successType,
  //         response: { status: 'ok' }
  //       });
  //       done();
  //     });
  //   });
  // });
});