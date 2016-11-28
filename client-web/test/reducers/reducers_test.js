// test/reducers
import chai, { expect } from 'chai';
import * as actionCreator from '../../src/actions/index';
import newUserReducer from '../../src/reducers/reducer_new_user';

describe('userInfo Reducer', () => {
  it('returns an object with default key-value pairs as default state', () => {
    let action = { type: 'UNKNOWN' };
    let newState = newUserReducer(undefined, action);

    expect(newState).to.deep.equal({
		  username: '', 
		  tempUniqUserId: '', 
		  status: false, 
		  userCode: 1, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false
		});
  });

	it('when server sends back updated userInfo, return an object with the updated info', () => {
		let action = {type: 'NEW-USER', payload: {status: true, username: 'traderJoe', tempUniqUserId: 'ivytqfm13998', userCode: 10}};
		let newState = newUserReducer(undefined, action); 

		expect(newState).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 10, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false
		});
	});

	it('when use enter a room, should return an object with the room info and corresponding status', () => {
		let action = {type: 'ENTERED-ROOM', room: 'HR48'}
		let state = {
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false
		};
		let newState = newUserReducer(state, action);

		expect(newState).to.deep.equal({
			username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: false,
		  showCreatePanel: false
		});
	});

	it('if user was in a room before entering another room, should return an object with the new room info and reset the corresponding status', () => {
		let action = {type: 'ENTERED-ROOM', room: 'HR48'}
		let state = {
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'TRUMP NOT PRESIDENT', 
		  inRoom: true, 
		  isReady: true,
		  showCreatePanel: false
		};
		let newState = newUserReducer(state, action);

		expect(newState).to.deep.equal({
			username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: false,
		  showCreatePanel: false
		});
	});

	it('when leaving a room, should return a newState with empty room info and reset corresponding status', () => {
		let action = {type: 'LEFT-ROOM'}
		let state = {
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: true,
		  showCreatePanel: false
		};
		let newState = newUserReducer(state, action);

		expect(newState).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false			
		});
	});

	it('when clicking the \'i am ready\' button, return toggle the isReady status of the state', () => {
		let action = {type: 'TOGGLED-READY'}
		let state = {
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: false,
		  showCreatePanel: false
		};
		let newState1 = newUserReducer(state, action);
		let newState2 = newUserReducer(newState1, action);

		expect(newState1).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: true,
		  showCreatePanel: false
		});
		expect(newState2).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: 'HR48', 
		  inRoom: true, 
		  isReady: false,
		  showCreatePanel: false
		});
	});

	it('when clicking the show/hide create room panel button, should toggle the showCreatePanel status of state', () => {
		let action = {type: 'TOGGLE-CREATE-ROOM-PANEL'}
		let state = {
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false
		};
		let newState1 = newUserReducer(state, action);
		let newState2 = newUserReducer(newState1, action);

		expect(newState1).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: true  
		});
		expect(newState2).to.deep.equal({
		  username: 'traderJoe', 
		  tempUniqUserId: 'ivytqfm13998', 
		  status: true, 
		  userCode: 11, 
		  room: '', 
		  inRoom: false, 
		  isReady: false,
		  showCreatePanel: false
		});
	});
});