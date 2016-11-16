import React from 'react';
import ConnectedApp, { LoginPage } from '../../src/components/loginPage';
import { findDOMNode } from 'react-dom';
import { Simulate, renderIntoDocument } from 'react-addons-test-utils';
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
  let component;

  beforeEach(() => {
    component = renderIntoDocument(<LoginPage />);
  });

  it('render the LoginPage component', () => {
    expect(component).to.exist;
  });

  it('Check the title text', () => {
    let DOMNode = findDOMNode(component);
    expect(DOMNode.querySelector('h2').textContent).to.equal('this is the loginPage');
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
