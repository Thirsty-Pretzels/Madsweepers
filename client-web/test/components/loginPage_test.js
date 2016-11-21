import React from 'react';
import ConnectedApp, { LoginPage } from '../../src/containers/loginPage';
import { findDOMNode } from 'react-dom';
import { Simulate, renderIntoDocument, createRenderer } from 'react-addons-test-utils';
import chai, { expect } from 'chai';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

describe('LoginPage' , () => {
  let app;
  let renderer;

  beforeEach(() => {
    //component = renderIntoDocument(<LoginPage />);
    // // shallow rendering
    // renderer = createRenderer();
    // renderer.render(<LoginPage />)
  });

  it('render the LoginPage component', () => {
   // component = this.renderer.getRenderOutput();
    expect(component).to.exist;
  });

  it('Should have access to application state username', () => {
    var username = 'testusername';
    var updateUsername = (username) => username = username;

    component = renderIntoDocument(<ConnectedApp store={ createMockStore({username, updateUsername}) } />);
    expect(component.props.store.getState().username).to.equal('testusername');
  });

  it('Should have access to updateUsername', () => {
    var username = 'initial';
    var updateUsername = (username) => username = username;

    component = renderIntoDocument(<ConnectedApp store={ createMockStore({username, updateUsername}) } />);

    expect(typeof component.props.store.getState().updateUsername).to.equal('function');
  });

  it('Should have three functions', () => {

    expect(typeof component.changeValue).to.equal('function');
    expect(typeof component.onFormSubmit).to.equal('function');
    expect(typeof component.handleRoom).to.equal('function');
  });

});
