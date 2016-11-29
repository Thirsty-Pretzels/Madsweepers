// test/actions
import chai, { expect } from 'chai';
import * as actionCreator from '../../src/actions/index.js';

describe('Test Unit for Action Creator' , () => {

  it('returns payload using action creator template', () => {
    var output = actionCreator.action('FOO', 'bar');
    expect(output).to.deep.equal({ type: 'FOO', payload: 'bar' });
  });

  it('when user tries to login the website, returns action with the username that user tries to Login with', () => {
  	let action = actionCreator.loginTempUser('ThirstyPretzelsRock');

    expect(action).to.deep.equal({ 
    	type: 'LOGIN-TEMP-USER', 
    	payload: 'ThirstyPretzelsRock'
    });
  });

  it('when user tries to enter a certain room, returns action with needed information ', () => {
  	let action = actionCreator.enterRoom('HR48', 'ThirstyPretzelsRock', true, 'join us')
  	
  	expect(action).to.deep.equal({
  		type: 'ENTER-ROOM',
  		room: 'HR48',
  		user: 'ThirstyPretzelsRock',
  		inRoom: true,
  		inRoomname: 'join us'
  	});
  });

   it('when user leaves a room, returns action with info of the room he is in and his username', () => {
		let action = actionCreator.leaveRoom('HR48', 'ThirstyPretzelsRock');

		expect(action).to.deep.equal({
			type: 'LEAVE-ROOM',
			room: 'HR48',
			user: 'ThirstyPretzelsRock'
		});
	});

  it('when user click button to toggle his state of ready is a room, returns action with info of his username and the room which he is in', () => {
  	let action = actionCreator.toggleReady('HR48', 'ThirstyPretzelsRock');

  	expect(action).to.deep.equal({
  		type: 'TOGGLE-READY',
  		room: 'HR48',
  		user: 'ThirstyPretzelsRock'
  	});
  });

  it('when user open or close the CreateRoomPanel, returns the action of toggleCreateRoomPanel', () => {
   	let action = actionCreator.toggleCreateRoomPanel();

   	expect(action).to.deep.equal({
   		type: 'TOGGLE-CREATE-ROOM-PANEL'
   	});
  });

  it('when user click the createRoom button, returns the action with the info of the room that user is trying to create', () => {
  	let action = actionCreator.createNewRoom('Let\'sHaveFun', 25, 29, 0.35);

  	expect(action).to.deep.equal({
  		type: 'CREATE-NEW-ROOM',
  		roomName: 'Let\'sHaveFun',
  		row: 25,
  		col: 29,
  		mineDensity: 0.35
  	});
  });

  it('wen user open a space, returns the action with userinfo, including username and location information', () => {
  	let action = actionCreator.openSpace('ThirstyPretzelsRock', {ready: true, status: 0, x: 6, y: 7});

  	expect(action).to.deep.equal({
  		type: 'OPEN-SPACE',
  		playerId: 'ThirstyPretzelsRock',
  		location: {
  			ready: true,
  			status: 0,
  			x: 6,
  			y: 7
  		}
  	});
  });

  it('wen user opens a space, returns the action with userinfo, including username and location information', () => {
  	let action = actionCreator.openSpace('ThirstyPretzelsRock', {ready: true, status: 4, x: 6, y: 7});

  	expect(action).to.deep.equal({
  		type: 'OPEN-SPACE',
  		playerId: 'ThirstyPretzelsRock',
  		location: {
  			ready: true,
  			status: 4,
  			x: 6,
  			y: 7
  		}
  	});
  });

  it('when user drops a flag, returns the action with userinfo, including username and location information', () => {
  	let action = actionCreator.dropFlag('ThirstyPretzelsRock', {ready: true, status: 2, x: 10, y: 23});

  	expect(action).to.deep.equal({
  		type: 'DROP-FLAG',
  		playerId: 'ThirstyPretzelsRock',
  		location: {
  			ready: true,
  			status: 2,
  			x: 10,
  			y: 23
  		}
  	});
  });

});

// export function movePlayer(playerId, key, location, board) {
//   var keyPress = 'STAY';

//   if ( key.slice(0, 5) === 'Arrow' ) {
//     if (key === 'ArrowUp' && location[playerId].y > 0 ) {
//       keyPress = 'UP';
//     } else if (key === 'ArrowDown' && location[playerId].y < board.length - 1) {
//       keyPress = 'DOWN';
//     } else if (key === 'ArrowLeft' && location[playerId].x > 0) {
//       keyPress = 'LEFT';
//     } else if (key === 'ArrowRight' && location[playerId].x < board[0].length - 1) {
//       keyPress = 'RIGHT';
//     }
//   }

//   return {
//     type: keyPress,
//     payload: playerId
//   }
// }